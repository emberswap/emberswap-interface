import { useEffect, useRef, useState } from 'react'
import { Area, XAxis, YAxis, ResponsiveContainer, Tooltip, AreaChart, BarChart, Bar } from 'recharts'
import { useTheme } from '../../../components/ThemeSwitch'
import { formattedNum, getTimeframe, toK, toNiceDate, toNiceDateYear } from '../../../utils'
import { darken } from 'polished'
import { useMedia, usePrevious } from 'react-use'
import { timeframeOptions } from '../../../constants'
import { useTokenChartData, useTokenPriceData } from '../../../contexts/TokenData'
import styled from 'styled-components'
import { AutoRow, RowBetween, RowFixed } from '../../../components/Row'
import { AutoColumn } from '../../../components/Column'
import { Activity } from 'react-feather'
import DropdownSelect from '../../../components/DropdownSelect'
import dynamic from "next/dynamic"
import LocalLoader from '../../../components/LocalLoader'
import ExternalLink from '../../../components/ExternalLink'
const CandleStickChart = dynamic(() => import('../../../components/CandleChart'), { ssr: false }); 


const OptionButton = styled.div`
  font-weight: 500;
  width: fit-content;
  white-space: nowrap;
  padding: 6px;
  border-radius: 6px;
  border: 1px solid ${({ active }) => active ? '#a1a1a1' : '#747473'};
  background-color: ${({ active }) => active && '#686868'};
  color: #f2eff2;

  :hover {
    cursor: ${({ disabled }) => !disabled && 'pointer'};
  }
`

const ChartWrapper = styled.div`
  height: 100%;
  min-height: 300px;

  @media screen and (max-width: 600px) {
    min-height: 200px;
  }
`

const PriceOption = styled(OptionButton)`
  border-radius: 2px;
`

const TimeOption = styled(OptionButton)`
    @media screen and (max-width: 860px) {
    position: relative;
    left: -20px;
  }
  @media screen and (max-width: 825px) {
    position: relative;
    left: -30px;
  }
  @media screen and (max-width: 795px) {
    position: relative;
    left: -40px;
  }
  @media screen and (max-width: 780px) {
    position: relative;
    left: -45px;
  }
`

const SymbolOption = styled(OptionButton)`
  background-color: #686868;
  min-width: 65px;
  text-align: center;
  @media screen and (max-width: 600px) {
    z-index: 20;
    position: relative;
    width: 80px;
    height:50px;
    padding: 4px 6px 4px 10px;
    border-radius: 8px;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    transition: background-color 0.3s ease-in 0s;
    border: 1px solid rgba(0, 0, 0, 0.15);
  }

`
const MobileRow = styled(AutoRow)`
  align-content: center;
  place-self: center;
  justify-content: center;
`

const CHART_VIEW = {
  VOLUME: 'Volume',
  LIQUIDITY: 'Liquidity',
  PRICE: 'Price',
  LINE_PRICE: 'Price (Line)',
}

const DATA_FREQUENCY = {
  DAY: 'DAY',
  HOUR: 'HOUR',
  LINE: 'LINE',
}

const ChartCard = ({ OutputAddress, base, symbol }) => {

  const [chartFilter, setChartFilter] = useState(CHART_VIEW.PRICE)
  const [frequency, setFrequency] = useState(DATA_FREQUENCY.LINE)
  const { theme } = useTheme()

  const textColor =  theme === 'dark' ? '#000' : '#fff'
  const textColor2 = theme === 'dark' ? 'rgb(236, 112, 36)' : 'rgb(236, 112, 36)'

  // reset view on new address
  const addressPrev = usePrevious(OutputAddress)
  useEffect(() => {
    if (OutputAddress !== addressPrev && addressPrev) {
      setChartFilter(CHART_VIEW.PRICE)
    }
  }, [OutputAddress, addressPrev])

  let chartData = useTokenChartData(OutputAddress)
  const [timeWindow, setTimeWindow] = useState(timeframeOptions.ALL_TIME)
  const prevWindow = usePrevious(timeWindow)

  // hourly and daily price data based on the current time window
  const hourlyWeek = useTokenPriceData(OutputAddress, timeframeOptions.WEEK, 3600)
  const hourlyMonth = useTokenPriceData(OutputAddress, timeframeOptions.MONTH, 3600)
  const hourlyAll = useTokenPriceData(OutputAddress, timeframeOptions.ALL_TIME, 3600)
  const dailyWeek = useTokenPriceData(OutputAddress, timeframeOptions.WEEK, 86400)
  const dailyMonth = useTokenPriceData(OutputAddress, timeframeOptions.MONTH, 86400)
  const dailyAll = useTokenPriceData(OutputAddress, timeframeOptions.ALL_TIME, 86400)   
  const priceData =
    timeWindow === timeframeOptions.MONTH
      ? // monthly selected
        frequency === DATA_FREQUENCY.DAY
        ? dailyMonth
        : hourlyMonth
      : // weekly selected
      timeWindow === timeframeOptions.WEEK
      ? frequency === DATA_FREQUENCY.DAY
        ? dailyWeek
        : hourlyWeek
      : // all time selected
      frequency === DATA_FREQUENCY.DAY
      ? dailyAll
      : hourlyAll

     // switch to hourly data when switched to week window
  useEffect(() => {
    if (timeWindow === timeframeOptions.WEEK && prevWindow && prevWindow !== timeframeOptions.WEEK) {
      setFrequency(DATA_FREQUENCY.HOUR)
    }
  }, [prevWindow, timeWindow])

  const below1080 = useMedia('(max-width: 1080px)')
  const below600 = useMedia('(max-width: 600px)')
  let utcStartTime = getTimeframe(timeWindow)
  const domain = [(dataMin) => (dataMin > utcStartTime ? dataMin : utcStartTime), 'dataMax']
  const aspect = below1080 ? 120 / 84 : below600 ? 120 / 84 : 90 / 45
  chartData = chartData?.filter((entry) => entry.date >= utcStartTime)

  // update the width on a window resize
  const ref = useRef()
  const isClient = typeof window === 'object'
  const [width, setWidth] = useState(ref?.current?.container?.clientWidth)
  useEffect(() => {
    if (!isClient) {
      return false
    }
    function handleResize() {
      setWidth(ref?.current?.container?.clientWidth ?? width)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [isClient, width]) // Empty array ensures that effect is only run on mount and unmount

  return (
    <div className="col-span-1 rounded backdrop-blur-md bg-dark-9900-custom z-1 flex flex-col order-last md:order-first mt-4 m-2 mb-20 sm:mb-0 md:mt-0 p-6 rounded-xxl">
    <ChartWrapper>
    {below600 ? (
      <RowBetween mb={40}>
        <DropdownSelect options={CHART_VIEW} active={chartFilter} setActive={setChartFilter} color={textColor2} />
          <MobileRow gap="6px" style={{ fontWeight: '800'}}>
            <ExternalLink href={`https://analytics.emberswap.com/token/`+ `${OutputAddress || ''}`}>
              <SymbolOption style={{ fontWeight: '800'}}>
                {symbol} 
              </SymbolOption>
            </ExternalLink>        
          </MobileRow>
        <DropdownSelect options={timeframeOptions} active={timeWindow} setActive={setTimeWindow} color={textColor2} />
      </RowBetween>
    ) : (
      <RowBetween
        mb={
          chartFilter === CHART_VIEW.LIQUIDITY ||
          chartFilter === CHART_VIEW.VOLUME ||
          (chartFilter === CHART_VIEW.PRICE && frequency === DATA_FREQUENCY.LINE)
            ? 40
            : 0
        }
        align="flex-start"
      >
        <AutoColumn gap="8px">
          <RowFixed>
            <OptionButton
              active={chartFilter === CHART_VIEW.LIQUIDITY}
              onClick={() => setChartFilter(CHART_VIEW.LIQUIDITY)}
              style={{ marginRight: '6px' }}
            >
              Liquidity
            </OptionButton>
            <OptionButton
              active={chartFilter === CHART_VIEW.VOLUME}
              onClick={() => setChartFilter(CHART_VIEW.VOLUME)}
              style={{ marginRight: '6px' }}
            >
              Volume
            </OptionButton>
            <OptionButton
              active={chartFilter === CHART_VIEW.PRICE}
              onClick={() => {
                setChartFilter(CHART_VIEW.PRICE)
              }}
            >
              Price
            </OptionButton>
          </RowFixed>
          {chartFilter === CHART_VIEW.PRICE && (
            <AutoRow gap="4px">
              <PriceOption
                active={frequency === DATA_FREQUENCY.DAY}
                onClick={() => {
                  setTimeWindow(timeframeOptions.MONTH)
                  setFrequency(DATA_FREQUENCY.DAY)
                }}
              >
                D
              </PriceOption>
              <PriceOption
                active={frequency === DATA_FREQUENCY.HOUR}
                onClick={() => setFrequency(DATA_FREQUENCY.HOUR)}
              >
                H
              </PriceOption>
              <PriceOption
                active={frequency === DATA_FREQUENCY.LINE}
                onClick={() => setFrequency(DATA_FREQUENCY.LINE)}
              >
                <Activity size={14} />
              </PriceOption>
            </AutoRow>
          )}
        </AutoColumn>       
         <AutoRow justify="flex-end" gap="6px" align="flex-start">
          <ExternalLink href={`https://analytics.emberswap.com/token/`+ `${OutputAddress || ''}`}>
            <SymbolOption style={{ marginRight: '60px', fontWeight: '800'}}>
             {symbol} 
            </SymbolOption>
          </ExternalLink>        
         </AutoRow>
        <AutoRow justify="flex-end" gap="6px" align="flex-start">
          <TimeOption
            active={timeWindow === timeframeOptions.WEEK}
            onClick={() => setTimeWindow(timeframeOptions.WEEK)}
          >
            1W
          </TimeOption>
          <TimeOption
            active={timeWindow === timeframeOptions.MONTH}
            onClick={() => setTimeWindow(timeframeOptions.MONTH)}
          >
            1M
          </TimeOption>
          <TimeOption
            active={timeWindow === timeframeOptions.ALL_TIME}
            onClick={() => setTimeWindow(timeframeOptions.ALL_TIME)}
          >
            All
          </TimeOption>
        </AutoRow>
      </RowBetween>
    )}
    {chartFilter === CHART_VIEW.LIQUIDITY && chartData && (
      <ResponsiveContainer aspect={aspect}>
        <AreaChart margin={{ top: 0, right: 10, bottom: 6, left: 0 }} barCategoryGap={1} data={chartData}>
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={'rgb(236, 112, 36)'} stopOpacity={0.35} />
              <stop offset="95%" stopColor={'#D8A50E'} stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis
            tickLine={false}
            axisLine={false}
            interval="preserveEnd"
            tickMargin={16}
            minTickGap={120}
            tickFormatter={(tick) => toNiceDate(tick)}
            dataKey="date"
            tick={{ fill: textColor }}
            type={'number'}
            domain={['dataMin', 'dataMax']}
          />
          <YAxis
            type="number"
            orientation="right"
            tickFormatter={(tick) => '$' + toK(tick)}
            axisLine={false}
            tickLine={false}
            interval="preserveEnd"
            minTickGap={80}
            yAxisId={0}
            tick={{ fill: textColor }}
          />
          <Tooltip
            cursor={true}
            formatter={(val) => formattedNum(val, true)}
            labelFormatter={(label) => toNiceDateYear(label)}
            labelStyle={{ paddingTop: 4 }}
            contentStyle={{
              padding: '10px 14px',
              borderRadius: 10,
              borderColor: textColor2,
              color: 'black',
            }}
            wrapperStyle={{ top: -70, left: -10 }}
          />
          <Area
            key={'other'}
            dataKey={'totalLiquidityUSD'}
            stackId="2"
            strokeWidth={2}
            dot={false}
            type="monotone"
            name={'Liquidity'}
            yAxisId={0}
            stroke={darken(0.12, textColor2)}
            fill="url(#colorUv)"
          />
        </AreaChart>
      </ResponsiveContainer>
    )}
    {chartFilter === CHART_VIEW.PRICE &&
      (frequency === DATA_FREQUENCY.LINE ? (
        <ResponsiveContainer aspect={aspect}>
          <AreaChart margin={{ top: 0, right: 10, bottom: 6, left: 0 }} barCategoryGap={1} data={chartData}>
           <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={'rgb(236, 112, 36)'} stopOpacity={0.35} />
              <stop offset="95%" stopColor={'#D8A50E'} stopOpacity={0} />
            </linearGradient>
           </defs>
            <XAxis
              tickLine={false}
              axisLine={false}
              interval="preserveEnd"
              tickMargin={16}
              minTickGap={120}
              tickFormatter={(tick) => toNiceDate(tick)}
              dataKey="date"
              tick={{ fill: textColor }}
              type={'number'}
              domain={domain}
            />
            <YAxis
              type="number"
              orientation="right"
              tickFormatter={(tick) => '$' + toK(tick)}
              axisLine={false}
              tickLine={false}
              interval="preserveEnd"
              minTickGap={80}
              yAxisId={0}
              tick={{ fill: textColor }}
            />
            <Tooltip
              cursor={true}
              formatter={(val) => formattedNum(val, true)}
              labelFormatter={(label) => toNiceDateYear(label)}
              labelStyle={{ paddingTop: 4 }}
              contentStyle={{
                padding: '10px 14px',
                borderRadius: 10,
                borderColor: textColor2,
                color: 'black',
              }}
              wrapperStyle={{ top: -70, left: -10 }}
            />
            <Area
              key={'other'}
              dataKey={'priceUSD'}
              stackId="2"
              strokeWidth={2}
              dot={false}
              type="monotone"
              name={'Price'}
              yAxisId={0}
              stroke={darken(0.12, textColor2)}
              fill="url(#colorUv)"
            />
          </AreaChart>
        </ResponsiveContainer>
      ) : priceData ? (
        <ResponsiveContainer aspect={aspect} ref={ref}>
          <CandleStickChart data={priceData} width={width} base={base} symbol={symbol}/>
        </ResponsiveContainer>) : (
          <LocalLoader />
        ))}

    {chartFilter === CHART_VIEW.VOLUME && (
      <ResponsiveContainer aspect={aspect}>
        <BarChart margin={{ top: 0, right: 10, bottom: 6, left: 10 }} barCategoryGap={1} data={chartData}>
          <XAxis
            tickLine={false}
            axisLine={false}
            interval="preserveEnd"
            minTickGap={80}
            tickMargin={14}
            tickFormatter={(tick) => toNiceDate(tick)}
            dataKey="date"
            tick={{ fill: textColor }}
            type={'number'}
            domain={['dataMin', 'dataMax']}
          />
          <YAxis
            type="number"
            axisLine={false}
            tickMargin={16}
            tickFormatter={(tick) => '$' + toK(tick)}
            tickLine={false}
            orientation="right"
            interval="preserveEnd"
            minTickGap={80}
            yAxisId={0}
            tick={{ fill: textColor }}
          />
          <Tooltip
            cursor={{ fill: textColor2, opacity: 0.1 }}
            formatter={(val) => formattedNum(val, true)}
            labelFormatter={(label) => toNiceDateYear(label)}
            labelStyle={{ paddingTop: 4 }}
            contentStyle={{
              padding: '10px 14px',
              borderRadius: 10,
              borderColor: textColor2,
              color: 'black',
            }}
            wrapperStyle={{ top: -70, left: -10 }}
          />
          <Bar
            type="monotone"
            name={'Volume'}
            dataKey={'dailyVolumeUSD'}
            fill={textColor2}
            opacity={'0.4'}
            yAxisId={0}
            stroke={textColor2}
          />
        </BarChart>
      </ResponsiveContainer>
    )}
  </ChartWrapper>
  </div>
)
}

export default ChartCard