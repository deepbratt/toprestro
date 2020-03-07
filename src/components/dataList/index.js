import React, { Fragment, useState, useEffect } from 'react';
import {Table} from 'react-bootstrap';
import {Pagination} from '../';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function RestroList(props){
    const [allDataSet , setAllDataSet] = useState([]);
    const [currentDataSet , setCurrentDataSet] = useState([]);
    const [currentPage , setCurrentPage] = useState(1);
    const [totalPages , setTotalPages] = useState(null);
    const [pageLimit , setPageLimit] = useState(5);
    const [totalDataSet , setTotalDataSet] = useState(0);

    useEffect(() => {
        setAllDataSet(props.Restro);
        setCurrentDataSet([]);
        
    });

    const setData = () => {
        const newDataSet = props.Restro;
        const currentPage = 1;
        const offset = (currentPage - 1) * pageLimit;
        const zzcurrentDataSet = newDataSet.slice (offset, offset + pageLimit);
        const totalDataSet2 = newDataSet.length;
        setAllDataSet(newDataSet);
        setCurrentDataSet(zzcurrentDataSet);
        setTotalDataSet(totalDataSet2);
    }
    const onPageChanged = (data) => {
        const currentPage = 1;
        const offset = (currentPage - 1) * pageLimit;
        const zzcurrentDataSet = allDataSet.slice (offset, offset + pageLimit);
        const totalDataSet2 = allDataSet.length;
        setCurrentDataSet(zzcurrentDataSet);
        setTotalDataSet(totalDataSet2);
    }
    return(
        <Fragment>
            <Table responsive striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Brand</th>
                        <th>Variety</th>
                        <th>Style</th>
                        <th>Country</th>
                        <th>Stars</th>
                        <th>Stars</th>
                    </tr>
                </thead>
                <tbody>
                {
                    currentDataSet.map((data,index) => {
                        return(
                            <tr key={index+1}>
                                <td>{index}</td>
                                <td>{data.Brand}</td>
                                <td>{data.Variety}</td>
                                <td>{data.Style}</td>
                                <td>{data.Country}</td>
                                <td>{data.Stars}</td>
                                <th>Stars</th>
                            </tr>
                        );
                    })
                }
                </tbody>
            </Table>
            <Pagination totalRecords={totalDataSet} pageLimit={pageLimit} pageNeighbours={1} onPageChanged={onPageChanged} />
        </Fragment>
    )
}