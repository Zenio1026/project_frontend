import {Paper, Skeleton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import SelectorSkeleton from "./SelectorSkeleton";

export default function LoadingCart() {

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


    return (

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
                        <TableRow hover role="checkbox">
                            {columns.map((column, index) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{
                                        minWidth: column.minWidth,
                                        height: '124px',
                                        fontWeight: 'bold',
                                        fontSize: '16px',
                                    }}
                                >
                                    {index === 0 ? <Skeleton variant="rounded" width="124px" height="124px"
                                                             animation="wave"/> : null}
                                    {index === 1 ? <Skeleton variant="text" width="90%" sx={{fontSize: '1.5rem'}}
                                                             animation="wave"/> : null}
                                    {index === 2 ? <Skeleton variant="text" width="100%" sx={{fontSize: '1.5rem'}}
                                                             animation="wave"/> : null}
                                    {index === 3 ? <SelectorSkeleton/> : null}
                                    {index === 4 ? <Skeleton variant="text" width="100%" sx={{fontSize: '1.5rem'}}
                                                             animation="wave"/> : null}
                                    {index === 5 ? (<IconButton>
                                        <DeleteIcon/>
                                    </IconButton>) : null}
                                </TableCell>
                            ))}
                        </TableRow>

                        <TableRow hover role="checkbox">
                            {columns.map((column, index) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{
                                        minWidth: column.minWidth,
                                        height: '124px',
                                        fontWeight: 'bold',
                                        fontSize: '16px',
                                    }}
                                >
                                    {index === 0 ? <Skeleton variant="rounded" width="124px" height="124px"
                                                             animation="wave"/> : null}
                                    {index === 1 ? <Skeleton variant="text" width="90%" sx={{fontSize: '1.5rem'}}
                                                             animation="wave"/> : null}
                                    {index === 2 ? <Skeleton variant="text" width="100%" sx={{fontSize: '1.5rem'}}
                                                             animation="wave"/> : null}
                                    {index === 3 ? <SelectorSkeleton/> : null}
                                    {index === 4 ? <Skeleton variant="text" width="100%" sx={{fontSize: '1.5rem'}}
                                                             animation="wave"/> : null}
                                    {index === 5 ? (<IconButton>
                                        <DeleteIcon/>
                                    </IconButton>) : null}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableBody>

                    <TableBody>
                        <TableRow hover role="checkbox">
                            {columns.map((column, index) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{
                                        minWidth: column.minWidth,
                                        height: '124px',
                                        fontWeight: 'bold',
                                        fontSize: '16px',
                                    }}
                                >
                                    {index === 0 ? <Skeleton variant="rounded" width="124px" height="124px"
                                                             animation="wave"/> : null}
                                    {index === 1 ? <Skeleton variant="text" width="90%" sx={{fontSize: '1.5rem'}}
                                                             animation="wave"/> : null}
                                    {index === 2 ? <Skeleton variant="text" width="100%" sx={{fontSize: '1.5rem'}}
                                                             animation="wave"/> : null}
                                    {index === 3 ? <SelectorSkeleton/> : null}
                                    {index === 4 ? <Skeleton variant="text" width="100%" sx={{fontSize: '1.5rem'}}
                                                             animation="wave"/> : null}
                                    {index === 5 ? (<IconButton>
                                        <DeleteIcon/>
                                    </IconButton>) : null}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableBody>

                </Table>
            </TableContainer>


            <TableContainer>
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
                                    {index === 3 ? 'Total' : null}
                                    {index === 4 ? <Skeleton variant="text" width="100%" sx={{fontSize: '1.5rem'}}
                                                             animation="wave"/> : null}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>

        </Paper>

    )
}