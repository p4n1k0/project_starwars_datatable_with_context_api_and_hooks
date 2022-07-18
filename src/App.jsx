import React from 'react';
import Table from './components/Table';
import TableProvider from './context/TableProvider';

function App() {
  return (
    <TableProvider>
      <h3>StarWars Planets Loading...</h3>
      <Table />
    </TableProvider>
  );
}

export default App;
