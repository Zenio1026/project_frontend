import {useContext, useEffect, useState} from "react";
import {
    Avatar, Paper,
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow
} from "@mui/material";
import TopNavBar from "../../component/TopNavBar.tsx";
import Container from "@mui/material/Container";
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from "@mui/material/IconButton";
import {CartItemListDto} from "../../../data/dto/CartItemDto.ts";
import * as CartItemApi from "../../../api/CartItemApi.ts"
import {useNavigate} from "react-router-dom";
import {LoginUserContext} from "../../../App.tsx";

// MUI table example
// interface Column {
//     id: 'name' | 'code' | 'population' | 'size' | 'density';
//     label: string;
//     minWidth?: number;
//     align?: 'right';
//     format?: (value: number) => string;
// }
// const columns: readonly Column[] = [
//     {id: 'name', label: 'Picture', minWidth: 170},
//     {id: 'code', label: 'Name', minWidth: 100},
//     {id: 'population', label: 'Population', minWidth: 170, align: 'right', format: (value: number) => value.toLocaleString('en-US'),},
//     {id: 'size', label: 'Size\u00a0(km\u00b2)', minWidth: 170, align: 'right', format: (value: number) => value.toLocaleString('en-US'),},
//     {id: 'density', label: 'Density', minWidth: 170, align: 'right', format: (value: number) => value.toFixed(2),},
// ];


// TODO: While in Loading ,cartItem Skeleton
export default function ShoppingCart() {
    const navigate = useNavigate()

    // const [page, setPage] = React.useState(0);
    // const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const [cartItem, setCartItem] = useState<CartItemListDto[] | []>([]);
    const [total, setTotal] = useState<number>(0);

    const loginUser = useContext(LoginUserContext);

    interface ExtendedCartItemListDto extends CartItemListDto {
        subtotal: number;
        cancel?: string;
    }

    interface Column {
        id: 'image_url' | 'name' | 'price' | 'cart_quantity' | 'subtotal' | 'cancel';
        label: string;
        minWidth?: number;
        align?: 'center' | 'right';
        format?: (value: number) => string;
    }

    const columns: readonly Column[] = [
        {id: 'image_url', label: 'Product', minWidth: 100},
        {id: 'name', label: 'Name', minWidth: 150},
        {
            id: 'price',
            label: 'Unit Price',
            minWidth: 170,
            align: 'center',
            format: (value: number) => `$ ${value.toFixed(2)}`
        },
        {id: 'cart_quantity', label: 'Quantity', minWidth: 100, align: 'center'},
        {
            id: 'subtotal',
            label: 'Subtotal',
            minWidth: 100,
            align: 'right',
            format: (value: number) => `$ ${value.toLocaleString('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            })}`
        },
        {id: 'cancel', label: '', minWidth: 100, align: 'center'}
    ]

    // const handleChangePage = (_event: unknown, newPage: number) => {
    //     setPage(newPage);
    // };
    //
    // const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     setRowsPerPage(+event.target.value);
    //     setPage(0);
    // };


    const getCartItem = async () => {
        try {
            document.title = "Shopping Cart"
            const data = await CartItemApi.getCartItem();
            setCartItem(data);

            const total = data.reduce((accumulator, item) => {
                return accumulator + item.price * item.cart_quantity;
            }, 0);
            setTotal(total);
        } catch (error) {
            navigate("/error");
        }
    }

    const rows: ExtendedCartItemListDto[] = cartItem.map(item => ({
        ...item,
        subtotal: item.price * item.cart_quantity
    }));

    const handleDeleteCarItem = (deletePid: number) => {
        CartItemApi.deleteCartItem(deletePid)
            .then(() => {
                setCartItem(prevCartItems => prevCartItems.filter(
                    item => item.pid !== deletePid)
                );
            });

        const newTotal = cartItem.reduce((accumulator, item) => {
            if (item.pid !== deletePid) {
                return accumulator + item.price * item.cart_quantity;
            }
            return accumulator;
        }, 0);

        setTotal(newTotal);
    }

    useEffect(() => {
        if (loginUser) {
            getCartItem();
        } else if (loginUser === null) {
            navigate("/login")
        }

    }, [loginUser])

    return (
        <div style={{backgroundColor: "grey", height: "100vh", overflow: "auto"}}>
            <TopNavBar/>

            <Container sx={{py: 5, overflow: "auto"}} maxWidth="xl">
                <h1>Shopping Cart</h1>
                <br/>

                <Paper sx={{width: '100%', overflow: 'hidden'}}>
                    <TableContainer sx={{maxHeight: 540}}>
                        <Table stickyHeader aria-label="sticky table">

                            <TableHead>
                                <TableRow>
                                    {columns.map((column) => (
                                        <TableCell
                                            key={column.id}
                                            align={column.align}
                                            style={{minWidth: column.minWidth}}
                                        >
                                            {column.label}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {rows
                                    // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row) => {
                                        return (
                                            <TableRow hover role="checkbox" tabIndex={-1} key={row.pid}>
                                                {columns.map((column) => {
                                                    const value = row[column.id];
                                                    if (column.id === "image_url") {
                                                        return (
                                                            <TableCell key={column.id} align={column.align}>
                                                                <Avatar
                                                                    src={String(value)}
                                                                    alt="Product Image"
                                                                    sx={{
                                                                        width: 124,
                                                                        height: 124,
                                                                        borderRadius: '8px'
                                                                    }}
                                                                />
                                                            </TableCell>
                                                        );
                                                    } else if (column.id === "cancel") {
                                                        return (
                                                            <TableCell
                                                                key={column.id}
                                                                align={column.align}
                                                                onClick={() => handleDeleteCarItem(row.pid)}
                                                            >
                                                                <IconButton>
                                                                    <DeleteIcon/>
                                                                </IconButton>
                                                            </TableCell>
                                                        );
                                                    }
                                                    return (
                                                        <TableCell key={column.id} align={column.align}>
                                                            {column.format && typeof value === "number"
                                                                ? column.format(value)
                                                                : value}
                                                        </TableCell>
                                                    );
                                                })}
                                            </TableRow>
                                        );
                                    })
                                }

                                <TableRow>
                                    <TableCell colSpan={3} sx={{borderBottom: 'none'}}/>
                                    <TableCell colSpan={1} align="center" sx={{height: 72, borderBottom: 'none'}}>
                                        Total
                                    </TableCell>
                                    <TableCell align="right" sx={{borderBottom: 'none'}}>
                                        {`$ ${total.toLocaleString('en-US', {
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits: 2
                                        })}`}
                                    </TableCell>
                                </TableRow>

                            </TableBody>
                        </Table>
                    </TableContainer>

                    {/*<TablePagination*/}
                    {/*    rowsPerPageOptions={[10, 25, 100]}*/}
                    {/*    component="div"*/}
                    {/*    count={rows.length}*/}
                    {/*    // rowsPerPage={rowsPerPage}*/}
                    {/*    // page={page}*/}
                    {/*    onPageChange={handleChangePage}*/}
                    {/*    onRowsPerPageChange={handleChangeRowsPerPage}*/}
                    {/*/>*/}

                </Paper>
            </Container>
        </div>
    )
}