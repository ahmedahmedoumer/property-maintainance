import React from 'react'

const Table = (props) => {
    const convertedRows = [];
    console.log(props.rows);
    props.rows.map((row) => (
        // console.log(Object.keys(row))
        convertedRows.push(Object.values(row))
    ))
    console.log(convertedRows);
    return (
        <div className="flex flex-col">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                    <div className="overflow-hidden">
                        <table className="min-w-full text-left text-sm font-light">
                            <thead
                                className="border-b bg-white font-medium dark:border-neutral-500 dark:bg-neutral-600">
                                <tr>
                                    {props.headers.map((value) => (
                                        <th key={value} scope="col" className="px-6 py-4">{value}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {convertedRows && convertedRows.map((row) => (
                                    <tr key={row[0]} className={`border-b bg-neutral-100 dark:border-neutral-500 dark:bg-neutral-700 ${(row[1] % 2 !== 0) && "bg-gray-100"}`}>
                                        {row.map((value) => (
                                            value !== row[0] && <td key={row[0]+value} className="whitespace-nowrap px-6 py-4">{value}</td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Table