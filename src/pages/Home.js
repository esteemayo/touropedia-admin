import styled from 'styled-components';
import { useState, useEffect, useMemo } from 'react';

import { phone } from 'responsive';
import Chart from 'components/Chart';
import WidgetSm from 'components/WidgetSm';
import WidgetLg from 'components/WidgetLg';
import FeaturedInfo from 'components/FeaturedInfo';
import { getUsersStats } from 'services/userService';

const Home = () => {
  const [userStats, setUserStats] = useState([]);

  const MONTHS = useMemo(
    () => [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ],
    []
  );

  useEffect(() => {
    (async () => {
      try {
        const { data } = await getUsersStats();

        const sortedStats = data.stats.sort((a, b) => a._id - b._id);

        sortedStats.map((item) => {
          return setUserStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], 'Active User': item.total },
          ]);
        });
      } catch (err) {
        console.log(err.response.data);
      }
    })();
  }, [MONTHS]);

  return (
    <Container>
      <FeaturedInfo />
      <Chart
        grid
        aspect={4 / 1}
        data={userStats}
        dataKey='Active User'
        title='User Analytics'
      />
      <Widget>
        <WidgetSm />
        <WidgetLg />
      </Widget>
    </Container>
  );
};

const Container = styled.div`
  flex: 4;
`;

const Widget = styled.div`
  display: flex;
  margin: 2rem;

  ${phone({ flexDirection: 'column' })}
`;

export default Home;
