import { useState, useEffect } from "react";
import { Typography, Box, styled } from "@mui/material";

import Balance from "./Balance";
import ExpenseCard from "./ExpenseCard";
import NewTransaction from "./NewTransaction";
import Transactions from "./Transactions";

const Header = styled(Typography)`
  margin: 10px 0;
  color: blue;
  font-size: 36px;
  text-transform: uppercase;
`;

const Component = styled(Box)`
  background: #FFF;
  padding: 10px;
  border-radius: 20px;
  display: flex;
  width: 800px;
  & > div {
    padding: 10px;
    width: 50%;
    height: 70vh;
  }
}
`;

function Finanse() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/transactions")
      .then((res) => res.json())
      .then((data) => setTransactions(data))
      .catch((err) => console.error(err));
  }, []);

  const deleteTransaction = (id) => {
    fetch(`http://localhost:5000/api/transactions/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setTransactions(
          transactions.filter((transaction) => transaction._id !== id)
        );
      })
      .catch((err) => console.error(err));
  };

  const addTransaction = (transaction) => {
    fetch("http://localhost:5000/api/transactions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(transaction),
    })
      .then((res) => res.json())
      .then((newTransaction) => {
        setTransactions([newTransaction, ...transactions]);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="App">
      <Header>Expense Tracker</Header>
      <Component>
        <Box>
          <Balance transactions={transactions} />
          <ExpenseCard transactions={transactions} />
          <NewTransaction addTransaction={addTransaction} />

          <Box>
            <Transactions
              transactions={transactions}
              deleteTransaction={deleteTransaction}
            />
          </Box>
        </Box>
      </Component>
    </div>
  );
}

export default Finanse;
