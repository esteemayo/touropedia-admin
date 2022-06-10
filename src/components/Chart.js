import styled from 'styled-components';
import {
  Area,
  AreaChart,
  XAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const Chart = ({ title, data, dataKey, grid, aspect }) => {
  return (
    <Container>
      <Title>{title}</Title>
      <ResponsiveContainer width='100%' aspect={aspect}>
        <AreaChart
          width={730}
          height={250}
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id='total' x1='0' y1='0' x2='0' y2='1'>
              <stop offset='5%' stopColor='#8884d8' stopOpacity={0.8} />
              <stop offset='95%' stopColor='#8884d8' stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey='name' stroke='#5550bd' />
          {grid && <CartesianGrid stroke='#e0dfdf' strokeDasharray='3 3' />}
          <Tooltip />
          <Area
            type='monotone'
            dataKey={dataKey}
            stroke='#8884d8'
            fillOpacity={1}
            fill='url(#total)'
          />
          <Legend />
        </AreaChart>
      </ResponsiveContainer>
    </Container>
  );
};

const Container = styled.div`
  margin: 2rem;
  padding: 2rem;
  -webkit-box-shadow: 0 0 1.5rem -1rem rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0 0 1.5rem -1rem rgba(0, 0, 0, 0.75);
  box-shadow: 0 0 1.5rem -1rem rgba(0, 0, 0, 0.75);
`;

const Title = styled.h3`
  text-transform: capitalize;
  font-size: 1.5rem;
  margin-bottom: 2rem;
`;

export default Chart;
