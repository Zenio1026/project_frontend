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
import * as ProductApi from "../../../api/ProductApi.ts"
import {useNavigate} from "react-router-dom";
import {LoginUserContext} from "../../../App.tsx";
import Selector from "./component/Selector.tsx";

// TODO: While in Loading ,cartItem Skeleton
export default function ShoppingCart() {
    const navigate = useNavigate()
    const [cartItem, setCartItem] = useState<CartItemListDto[] | []>([]);
    const [total, setTotal] = useState<number>(0);
    const loginUser = useContext(LoginUserContext);

    // ----- For table use -----
    interface ExtendedCartItemListDto extends CartItemListDto {
        subtotal: number;
        cancel?: string;
    }

    interface Column {
        id: 'image_url' | 'name' | 'price' | 'cart_quantity' | 'subtotal' | 'cancel';
        label: string;
        minWidth?: number;
        align?: 'center';
        format?: (value: number) => string;
    }

    const columns: readonly Column[] = [
        {id: 'image_url', label: 'Product', minWidth: 150},
        {id: 'name', label: 'Name', minWidth: 300},
        {
            id: 'price',
            label: 'Unit Price',
            minWidth: 100,
            align: 'center',
            format: (value: number) => `$ ${value.toFixed(2)}`
        },
        {
            id: 'cart_quantity',
            label: 'Quantity',
            minWidth: 200,
            align: 'center'
        },
        {
            id: 'subtotal',
            label: 'Subtotal',
            minWidth: 100,
            align: 'center',
            format: (value: number) => `$ ${value.toLocaleString('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            })}`
        },
        {id: 'cancel', label: '', minWidth: 80, align: 'center'}
    ]
    const rows: ExtendedCartItemListDto[] = cartItem.map(item => ({
        ...item,
        subtotal: item.price * item.cart_quantity
    }));

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

    // need async await ??? so slow
    const handleUpdateQuantity = async (pid: number, updatedQuantity: number) => {
        try {
            if (updatedQuantity < 1) {
                updatedQuantity = 1;
                return null;
            }

            const stockQuantityPromise = await ProductApi.getProductDetail(String(pid));
            const stockQuantity = stockQuantityPromise.stock;

            if (updatedQuantity > stockQuantity) {
                updatedQuantity = stockQuantity;
            }
            const updatedCartItem = cartItem.map((item) => {
                if (item.pid === pid) {
                    CartItemApi.patchCartItem(pid, updatedQuantity);
                    return {
                        ...item,
                        cart_quantity: updatedQuantity,
                        subtotal: item.price * updatedQuantity,
                    };
                }
                return item;
            });
            setCartItem(updatedCartItem);

            const newTotal = updatedCartItem.reduce((accumulator, item) => {
                return accumulator + item.price * item.cart_quantity;
            }, 0);
            setTotal(newTotal);
        } catch (error) {
            navigate('/error');
        }
    };

    // api can be reduced but need to depend on situation.
    const handleDeleteCarItem = async (deletePid: number) => {
        try {
            await CartItemApi.deleteCartItem(deletePid)
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
        } catch (error) {
            navigate("/error");
        }
    }

    useEffect(() => {
        if (loginUser) {
            getCartItem();
        } else if (loginUser === null) {
            navigate("/login")
        }
    }, [loginUser])

    return (
        <div style={{backgroundColor: "whitesmoke", height: "100vh", overflow: "auto"}}>
            <TopNavBar/>
            <Container sx={{py: 5, overflow: "auto"}} maxWidth="xl">
                <h1>Shopping Cart</h1>
                <br/>
                <Paper sx={{width: '100%', overflow: 'hidden'}}>
                    <TableContainer sx={{maxHeight: 540, backgroundColor: "transparent"}}>
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
                                {rows.map((row) => {
                                    return (
                                        <TableRow key={row.pid} hover role="checkbox">
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
                                                } else if (column.id === "cart_quantity") {
                                                    return (
                                                        <TableCell key={column.id} align={column.align}>
                                                            <Selector
                                                                quantity={Number(value)}
                                                                handleOnChange={(updatedQuantity) => handleUpdateQuantity(row.pid, updatedQuantity)}
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
                                                } else {
                                                    return (
                                                        <TableCell key={column.id} align={column.align}>
                                                            {column.format && typeof value === "number"
                                                                ? column.format(value)
                                                                : value}
                                                        </TableCell>
                                                    );
                                                }
                                            })}
                                        </TableRow>
                                    );
                                })}

                            </TableBody>
                        </Table>
                    </TableContainer>

                    <TableContainer
                        sx={{
                            backgroundColor: "transparent",
                            overflowY: rows.length > 3 ? "scroll" : "auto",
                            "&::-webkit-scrollbar": {
                                backgroundColor: "transparent",
                            },
                            "&::-webkit-scrollbar-thumb": {
                                backgroundColor: "transparent",
                            },
                            "&::-webkit-scrollbar-thumb:hover": {
                                backgroundColor: "rgba(0, 0, 0, 0.2)",
                            },
                        }}
                    >
                        <Table>
                            <TableRow hover role="checkbox">
                                {columns.map((column, index) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{
                                            minWidth: column.minWidth,
                                            height: '124.5px',
                                            fontWeight: 'bold',
                                            fontSize: '16px',
                                        }}
                                    >
                                        {index === 3 ? 'Total' : null}
                                        {index === 4 ? `$ ${total.toLocaleString('en-US', {
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits: 2
                                        })}` : null}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </Table>
                    </TableContainer>

                </Paper>
            </Container>
        </div>
    )
}