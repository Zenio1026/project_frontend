import {useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

import {
    Avatar,
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";
import Container from "@mui/material/Container";
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from "@mui/material/IconButton";
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';

import {LoginUserContext} from "../../../App.tsx";
import DeleteItemSkeleton from "./component/DeleteItemSkeleton.tsx";
import EmptyCart from "./component/EmptyCart.tsx";
import LoadingCart from "./component/LoadingCart.tsx";
import Selector from "./component/Selector.tsx";
import SelectorSkeleton from "./component/SelectorSkeleton.tsx";
import TopNavBar from "../../component/TopNavBar.tsx";

import {CartItemListDto} from "../../../data/dto/CartItemDto.ts";
import * as CartItemApi from "../../../api/CartItemApi.ts"
import * as ProductApi from "../../../api/ProductApi.ts"

export default function ShoppingCart() {
    const loginUser = useContext(LoginUserContext);
    const navigate = useNavigate()

    const [cartItem, setCartItem] = useState<CartItemListDto[] | undefined>(undefined);
    const [total, setTotal] = useState<number | undefined>(0);

    const [isPatchingQuantity, setIsPatchingQuantity] = useState<boolean>(false);
    const [patchingItemId, setPatchingItemId] = useState<number | null>(null);

    const [isDeletingItem, setIsDeletingItem] = useState<boolean>(false);
    const [deletingItemId, setDeletingItemId] = useState<number | null>(null);

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

    const rows: ExtendedCartItemListDto[] | undefined = cartItem && cartItem.map(item => ({
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

    const handleUpdateQuantity = async (pid: number, updatedQuantity: number) => {
        try {
            if (updatedQuantity < 1) {
                return null;
            }

            setIsPatchingQuantity(true);
            setPatchingItemId(pid);

            const stockQuantityPromise = await ProductApi.getProductDetail(String(pid));
            const stockQuantity = stockQuantityPromise.stock;

            if (updatedQuantity > stockQuantity) {
                updatedQuantity = stockQuantity;
            }

            const updatedCartItem = cartItem && cartItem.map((item) => {
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

            const newTotal = updatedCartItem && updatedCartItem.reduce((accumulator, item) => {
                return accumulator + item.price * item.cart_quantity;
            }, 0);
            setTotal(newTotal);

            setIsPatchingQuantity(false);

        } catch (error) {
            navigate('/error');
        }
    };

    // api can be reduced but need to depend on situation.
    const handleDeleteCarItem = async (deletePid: number) => {
        try {
            setIsDeletingItem(true);
            setDeletingItemId(deletePid);
            await CartItemApi.deleteCartItem(deletePid)
                .then(() => {
                    setCartItem(prevCartItems => prevCartItems && prevCartItems.filter(
                        item => item.pid !== deletePid)
                    );
                });

            const newTotal = cartItem && cartItem.reduce((accumulator, item) => {
                if (item.pid !== deletePid) {
                    return accumulator + item.price * item.cart_quantity;
                }
                return accumulator;
            }, 0);

            setTotal(newTotal);
            setIsDeletingItem(false);
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
        <div style={{
            // backgroundImage: "url('./../../../public/PS-Pattern2.jpg')",
            // backgroundSize: "cover",
            // backgroundRepeat: "no-repeat",
            // backgroundPosition: "center",
            // backgroundColor: "whitesmoke",
            height: "100vh",
            overflow: "auto"
        }}>
            <TopNavBar/>
            <Container sx={{py: 5, overflow: "auto"}} maxWidth="xl">

                <h1 style={{
                    color: "snow",
                    fontFamily: "Arial",
                    fontSize: "30px",
                    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
                }}>
                    Shopping Cart
                </h1>
                <br/>

                {
                    cartItem ? (
                        cartItem.length > 0 ? (
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
                                            {rows && rows.map((row) => {
                                                return (
                                                    <TableRow key={row.pid} hover role="checkbox">
                                                        {columns.map((column) => {
                                                            const value = row[column.id];
                                                            if (column.id === "image_url") {
                                                                return (
                                                                    <TableCell key={column.id}
                                                                               align={column.align}>
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
                                                                    <TableCell key={column.id}
                                                                               align={column.align}>
                                                                        {
                                                                            isPatchingQuantity && patchingItemId === row.pid ? (
                                                                                <SelectorSkeleton/>
                                                                            ) : (
                                                                                <Selector
                                                                                    quantity={Number(value)}
                                                                                    handleOnChange={(updatedQuantity) => handleUpdateQuantity(row.pid, updatedQuantity)}
                                                                                />
                                                                            )
                                                                        }
                                                                    </TableCell>
                                                                );
                                                            } else if (column.id === "cancel") {
                                                                return (
                                                                    <TableCell
                                                                        key={column.id}
                                                                        align={column.align}
                                                                        onClick={() => handleDeleteCarItem(row.pid)}
                                                                    >
                                                                        {
                                                                            isDeletingItem && deletingItemId === row.pid ? (
                                                                                <DeleteItemSkeleton/>
                                                                            ) : (
                                                                                <IconButton>
                                                                                    <DeleteIcon/>
                                                                                </IconButton>
                                                                            )
                                                                        }
                                                                    </TableCell>
                                                                );
                                                            } else {
                                                                return (
                                                                    <TableCell key={column.id}
                                                                               align={column.align}>
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

                                <TableContainer sx={{
                                    overflowY: rows && rows.length > 3 ? "scroll" : "auto",
                                    "&::-webkit-scrollbar": {
                                        backgroundColor: "transparent",
                                    },
                                    "&::-webkit-scrollbar-thumb": {
                                        backgroundColor: "transparent",
                                    },
                                    "&::-webkit-scrollbar-thumb:hover": {
                                        backgroundColor: "rgba(0, 0, 0, 0.2)",
                                    },
                                }}>
                                    <Table>
                                        <TableBody>
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
                                                        {index === 1 ? (
                                                            <Button
                                                                type="submit"
                                                                variant="contained"
                                                                style={{ marginLeft: '-150px' }}
                                                                sx={{
                                                                    width: "300px",
                                                                    borderRadius: "24px",
                                                                    fontSize: "16px",
                                                                    fontWeight: "bold",
                                                                    backgroundColor: "rgb(214, 61, 0)",
                                                                    "&:hover": {
                                                                        backgroundColor: "rgb(163, 46, 0)",
                                                                    },
                                                                    "&:active": {
                                                                        backgroundColor: "rgb(112, 32, 0)",
                                                                    },
                                                                }}
                                                                startIcon={<ShoppingCartCheckoutIcon
                                                                    style={{fontSize: "24px"}}/>}
                                                            >
                                                                Check Out
                                                            </Button>
                                                        ) : null}

                                                        {index === 3 ? 'Total' : null}
                                                        {index === 4 ? `$ ${total && total.toLocaleString('en-US', {
                                                            minimumFractionDigits: 2,
                                                            maximumFractionDigits: 2
                                                        })}` : null}
                                                    </TableCell>
                                                ))}
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </TableContainer>

                            </Paper>
                        ) : (
                            <EmptyCart/>
                        )
                    ) : (
                        <LoadingCart/>
                    )
                }
            </Container>
        </div>
    );
}