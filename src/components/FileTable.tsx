// src/components/FancyTable.tsx
import React from 'react';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Spinner
} from '@nextui-org/react';
import { useQuery } from '@tanstack/react-query';
import { fetchFiles } from '../api/getFiles';

const FancyTable: React.FC = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['files'],
    queryFn: fetchFiles,
    refetchInterval: 5000
  });

  console.log(data, 'data');

  if (isLoading) {
    return (
      <div className='h-full w-full'>
        <Spinner />
      </div>
    );
  }

  const formatAddress = (address: string) => {
    if (!address) return '';
    return address.slice(0, 15) + '...' + address.slice(address.length - 15);
  };

  return (
    <div className='container mx-auto px-4 sm:px-8'>
      <div className='py-8'>
        <div className='flex justify-between items-center'>
          <h2 className='text-2xl font-semibold leading-tight'>
            Transaction Table
          </h2>
          <div className='relative text-gray-600'>
            <span className='absolute inset-y-0 left-0 flex items-center pl-2'>
              <svg
                fill='none'
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                viewBox='0 0 24 24'
                className='w-6 h-6 text-gray-400'
              >
                <path d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'></path>
              </svg>
            </span>
            <input
              type='search'
              name='search'
              placeholder='Search'
              className='block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 sm:text-sm'
            />
          </div>
        </div>
        <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
          <div className='inline-block min-w-full shadow-md rounded-lg overflow-hidden'>
            <Table
              aria-label='Example table with dynamic content'
              style={{ height: 'auto', minWidth: '100%' }}
            >
              <TableHeader>
                <TableColumn>Link</TableColumn>
                <TableColumn>Txn Hash</TableColumn>
                <TableColumn>Block number</TableColumn>
                <TableColumn>Gnosis Scan Link of Txn Hash</TableColumn>
              </TableHeader>
              <TableBody>
                {data.map((file: any, index: any) => (
                  <TableRow key={index}>
                    <TableCell>
                      <a
                        target='_blank'
                        className='text-blue-600 hover:text-blue-900 w-full flex justify-center'
                        href={`https://portal.fileverse.io/#/${file.portalAddress}/file/${file.fileId}`}
                        rel='noreferrer'
                      >
                        {formatAddress(
                          `https://portal.fileverse.io/#/${file.portalAddress}/file/${file.fileId}`
                        )}
                      </a>
                    </TableCell>
                    <TableCell>
                      <p className='flex justify-center w-full'>
                        {formatAddress(file.transactionHash)}
                      </p>
                    </TableCell>
                    <TableCell>
                      <p className='flex justify-center w-full'>
                        {file.blockNumber}
                      </p>
                    </TableCell>
                    <TableCell className='flex justify-center'>
                      <a
                        target='_blank'
                        href={`https://gnosisscan.io/tx/${file.transactionHash}`}
                        className='text-blue-600 hover:text-blue-900'
                        rel='noreferrer'
                      >
                        {formatAddress(
                          `https://gnosisscan.io/tx/${file.transactionHash}`
                        )}
                      </a>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FancyTable;
