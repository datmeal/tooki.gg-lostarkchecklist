import React, {useEffect, useState} from "react";
import _, {times} from "lodash";
import styled from "@emotion/styled";
import {css} from "@emotion/react";
import moment from "moment";
import {
  add,
  differenceInMilliseconds,
  differenceInSeconds,
  formatDuration,
  hoursToMilliseconds,
  hoursToSeconds,
  intervalToDuration,
  parse,
  setDay,
  startOfToday,
  sub
} from "date-fns";
import {format, formatInTimeZone} from "date-fns-tz";
import {ThemeProvider} from "@mui/material/styles";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Typography from "@mui/material/Typography";

import {days, dayText, timerData} from "./timerData";


export default function Events(props) {
  const { theme, useStore, taskStore } = props;
  const currentTime = useStore((state) => state.currentTime);
  const currentTimeAsDate = parse(currentTime,"HH:mm:ss", new Date());
  const currentTimeAsSeconds = differenceInSeconds(currentTimeAsDate, startOfToday());
  const currentDay = useStore((state) => state.currentDay); // a number 0-6
  const rosterStatus = taskStore((state) => state.rosterStatus);
  const filter = useStore((state) => state.eventSettings.filter);
  // const offset = useStore((state) => state.eventSettings.offset); // add to offset AGS shenanigans, DST
  const timezone = useStore((state) => state.eventSettings.timezone);
  // const offsetSeconds = moment.duration(timezone, "h").asSeconds();
  const resetTimeAsSeconds = hoursToSeconds(5);
  const endOfDayAsSeconds = hoursToSeconds(24);
  const previousDay = format(sub(currentTimeAsDate, {days: 1}), "eee").toLowerCase(); //string "sat"

  const nextDay = format(add(currentTimeAsDate, {days: 1}), "eee").toLowerCase(); // string "sat"
  const setCurrentTime = useStore((state) => state.setCurrentTime);
  const setCurrentDay = useStore((state) => state.setCurrentDay);  
  const eventCount = 30;


  //Splits a HH:mm string to seconds only
  const parseTimeStringtoSecs = (time) => {
    let a = time.split(':');
    let seconds = (+a[0]) * 60 * 60 + (+a[1]) * 60;
    return seconds;
  }

  const parseTimezone = (timezone) => {
    const timezones = {
      "EST/AST": -4,
      PST: -7,
      CET: 1,
      UTC: 0,
      // AST: 0,
    };
    return _.findKey(timezones, (zone) => {
      return zone === timezone;
    });
  };

  // Event Math
  function parseEvents() {
    const categories = _.map(timerData, (categoryObj, categoryName) => {
      // if category isn't complete on checklist, return array of events ( maybe in future, add a setting to show complete tasks )
      if (rosterStatus.grandprix && categoryName === "fever") {
        return [];
      }
      if (rosterStatus.adv && categoryName === "adventure") {
        return [];
      }
      if (rosterStatus.chaosgate && categoryName === "chaos") {
        return [];
      }
      if (rosterStatus.cal && categoryName === "fieldboss") {
        return [];
      }
      return _.map(categoryObj, (event) => {
        return { ...event, category: categoryName };
      });
    });
    // console.log("categories:", categories);
    return categories.flatMap((category) => category);
  }

  const timerEvents = () => {
    const filteredEvents = _.filter(parseEvents(), (event) => {
      return filter[event.category][event.id];
    });

    const todaysEvents = filteredEvents.reduce((result, event) => {
      const newEvent = _.cloneDeep(event);
      newEvent.times = {};
      // include all times for today
      if (_.has(event.times, days[currentDay])) {
        newEvent.times = {
          ...newEvent.times,
          [days[currentDay]]: event.times[days[currentDay]],
        };
      }
      // filter to include times before server reset of next day. event.times[day] returns a string!
      if (
        _.has(event.times, nextDay) &&
        _.some(
          event.times[nextDay],
          (time) => parseTimeStringtoSecs(time) <= resetTimeAsSeconds
        )
      ) {
        const nextDayTimes = event.times[nextDay].reduce((result, time) => {
          const timeAsSeconds = parseTimeStringtoSecs(time);
          if (timeAsSeconds <= resetTimeAsSeconds) {
            result.push(time);
          }
          return result;
        }, []);
        newEvent.times = {
          ...newEvent.times,
          [nextDay]: nextDayTimes,
        };
      }
      if (!_.isEmpty(newEvent.times)) {
        result.push(newEvent);
      }
      return result;
    }, []);
    // console.log("TodaysEvents:", todaysEvents);
    const allTodayEvents = todaysEvents.flatMap((event) => {
      return _.flatMap(event.times, (day, dayName) => {
        return day.flatMap((time) => {

          let eventTime = moment(time, "HH:mm")
              // .subtract(offsetSeconds, "seconds")
              .format("HH:mm");
          const eventTimeAsDate = parse(eventTime, "HH:mm", new Date());
          let remainingTime;
          let eventDuration = event.duration ? event.duration : 180;
          if (dayName === previousDay || dayName === days[currentDay]) {
            remainingTime = differenceInSeconds((eventTimeAsDate), startOfToday()) - currentTimeAsSeconds;

          }
          if (
            dayName === nextDay ||
            (dayName === days[currentDay] && eventTime === "00:00")
          ) {
            remainingTime =
                differenceInSeconds((eventTimeAsDate), startOfToday()) +
                hoursToSeconds(24) -
                currentTimeAsSeconds;
          }
          const remainingTimeText = formatDuration(intervalToDuration({ start: 0, end: remainingTime * 1000 }),{ format: ['hours', 'minutes'] });
          //const remainingTimeText = formatDuration(intervalToDuration({start: 0, end: remainingTime * 1000}));
          return {
            category: event.category,
            day: dayName,
            duration: eventDuration,
            id: event.id,
            ilvl: event.ilvl,
            image: event.image,
            location: event.location,
            name: event.name,
            remainingTime,
            remainingTimeText,
            time: eventTime,
            times: event.times,
          };
        });
      });
    });


    const upcomingEvents = _.filter(allTodayEvents, (event) => {
      return event.remainingTime > -event.duration;
    });

    return _.slice(
        _.orderBy(upcomingEvents, "remainingTime"),
        0,
        eventCount
    );
  };

  // Clock math
  // Refreshes clock, temporarily disabled for developing
  useEffect(() => {
    function refreshClock() {
            
      //old
      //setCurrentTime(moment().utc().add(timezone, "hours").format("HH:mm:ss"));
      //new
      setCurrentTime(formatInTimeZone(add(new Date(), { hours: timezone}), "UTC", 'HH:mm:ss'));      

      //old
      //setCurrentDay(moment().utc().add(timezone, "hours").format("e"));
      //new   
      setCurrentDay(formatInTimeZone(add(new Date(), { hours: timezone}),"UTC",  'i'));

      // Test Time
      setCurrentTime(moment("23:59", "HH:mm").format("HH:mm:ss"));
      setCurrentDay(moment("03-25-2022", "MM-DD-YYYY").format("e")); // friday

    }

    const timerId = setInterval(refreshClock, 1000);
    return function cleanup() {
      clearInterval(timerId);
    };
  }, [setCurrentTime, setCurrentDay, timezone]);

  const parsedEvents = parseEvents();

  return (
    // changed uses of moment to use date-fns
    <ThemeProvider theme={theme}>      
      <Typography variant="h4" component="h1" align="center">   
        {currentTime}        
        {` ${parseTimezone(timezone)}`}
      </Typography>
      <Typography align="center">
        {format(setDay(new Date(), currentDay), 'EEEE')}                     
      </Typography>
      <Box>
        <TimezoneControl timezone={timezone} useStore={useStore} />
      </Box>
      {/* <Paper sx={{ my: 1, p: { xs: 1, md: 1 } }}>
        <Typography component="h1" variant="h6" align="center">
          Timeline
        </Typography>
      </Paper>
      <Timeline theme={theme} useStore={useStore} /> */}
      <Grid container spacing={1}>
        <Grid item md={4} sm={6} xs={12}>
          <Favorites
            theme={theme}
            useStore={useStore}
            taskStore={taskStore}
            events={parsedEvents}
          />
        </Grid>
        <Grid item md={4} sm={6} xs={12}>
          <Timers
            events={timerEvents()}
            theme={theme}
            useStore={useStore}
            taskStore={taskStore}
          />
        </Grid>
        <Grid item md={4} sm={0} xs={0}>
          <Paper
            sx={{
              my: 1,
              p: { xs: 1, md: 1 },
            }}
            variant="outlined"
          >
            <Typography component="h1" variant="h6" align="center">
              Filter
            </Typography>
            {/* <Switch /> */}
          </Paper>
          <FilterList
            theme={theme}
            currentDay={currentDay}
            useStore={useStore}
            rosterStatus={rosterStatus}
          />
          {/* <TodoList /> */}
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

function TodoList(props) {
  return (
    <Paper
      sx={{
        my: 1,
        p: { xs: 1, md: 1 },
      }}
    >
      <Typography>To Do:</Typography>
      <List dense={true}>
        <ListItem>
          <ListItemText>Favorites List</ListItemText>
        </ListItem>
        <ListItem>
          <ListItemText>Day/Week Toggle</ListItemText>
        </ListItem>
        <ListItem>
          <ListItemText>Pet Buff Calculator</ListItemText>
        </ListItem>
      </List>
    </Paper>
  );
}

function TimezoneControl(props) {
  const timezones = {
    east: -4,
    west: -7,
    euc: 1,
    euw: 0,
    ast: -4,
  };

  const { timezone, useStore } = props;
  const [value, setValue] = React.useState(timezone);
  const setTimezone = useStore((state) => state.setTimezone);

  const handleRadioChange = (event) => {
    const value = _.parseInt(event.target.value);
    setValue(value);
    setTimezone(value);
  };

  return (
    <FormControl>
      <FormLabel id="timezone">Server</FormLabel>
      <RadioGroup
        row
        aria-labelledby="timezone"
        name="timezone"
        value={value}
        onChange={handleRadioChange}
      >
        <FormControlLabel
          value={timezones.east}
          control={<Radio />}
          label="US East / South America"
        />
        <FormControlLabel
          value={timezones.west}
          control={<Radio />}
          label="US West"
        />
        <FormControlLabel
          value={timezones.euc}
          control={<Radio />}
          label="EU Central"
        />
        <FormControlLabel
          value={timezones.euw}
          control={<Radio />}
          label="EU West"
        />
        {/* <FormControlLabel
          value={timezones.ast}
          control={<Radio />}
          label="South America"
        /> */}
      </RadioGroup>
    </FormControl>
  );
}

function Timeline(props) {
  const { theme, useStore } = props;

  const Hours = styled.div`
    position: relative;
    display: block;
    height: 24px;
  `;

  const dynamicStyle = (props) => css`
    position: absolute;
    left: ${(props.position / 24) * 100}%;
    padding-left: 4px;
    border-left: 1px solid ${theme.palette.text.primary};
  `;

  const HourStyle = styled.span`
    ${dynamicStyle}
  `;

  const Hour = (props) => {
    const { label, position } = props;
    return <HourStyle position={position}>{label}</HourStyle>;
  };

  const dynamicIndicatorStyle = (props) => css`
    position: absolute;
    left: ${props.position}%;
    top: -8px;
    bottom: -8px;
    width: 2px;
    background-color: ${theme.palette.una.main};
  `;

  const IndicatorStyle = styled.span`
    ${dynamicIndicatorStyle}
  `;

  const Indicator = (props) => {
    const { position } = props;
    return <IndicatorStyle position={position} />;
  };

  // Hooks
  //   const [currentTime, setCurrentTime] = useState(""); // moment().zone("-14:00").format("HH:mm:ss")
  const [indicatorPosition, setIndicatorPosition] = useState(0);
  const currentTime = useStore((state) => state.currentTime);
  const currentTimeAsDate = parse(currentTime,"HH:mm:ss", new Date());

  // Auto moves hand
  const currentTimeAsMilli = differenceInMilliseconds(currentTimeAsDate, startOfToday());
  // const startTimeAsMilli = moment.duration("00:00:00").asMilliseconds();
  const endTimeAsMilli = hoursToMilliseconds(24);
  useEffect(() => {
    setIndicatorPosition((currentTimeAsMilli / endTimeAsMilli) * 100);
  }, [currentTimeAsMilli, endTimeAsMilli]);

  //   console.log(indicatorPosition);

  return (
    <Paper sx={{ my: { xs: 3, md: 1 }, p: { xs: 1, md: 1 } }}>
      <Hours>
        <Indicator position={indicatorPosition} />
        <Hour label="12A" position={0} />
        <Hour label="1" position={1} />
        <Hour label="2" position={2} />
        <Hour label="3" position={3} />
        <Hour label="4" position={4} />
        <Hour label="5" position={5} />
        <Hour label="6" position={6} />
        <Hour label="7" position={7} />
        <Hour label="8" position={8} />
        <Hour label="9" position={9} />
        <Hour label="10" position={10} />
        <Hour label="11" position={11} />
        <Hour label="12P" position={12} />
        <Hour label="1" position={13} />
        <Hour label="2" position={14} />
        <Hour label="3" position={15} />
        <Hour label="4" position={16} />
        <Hour label="5" position={17} />
        <Hour label="6" position={18} />
        <Hour label="7" position={19} />
        <Hour label="8" position={20} />
        <Hour label="9" position={21} />
        <Hour label="10" position={22} />
        <Hour label="11" position={23} />
      </Hours>
    </Paper>
  );
}

function Timers(props) {
  const { events, useStore, isFavorite = false } = props;
  const offset = useStore((state) => state.eventSettings.offset);
  const timezone = useStore((state) => state.eventSettings.timezone);
  const favorites = useStore((state) => state.eventSettings.favorites);
  const addFavorite = useStore((state) => state.addFavorite);

  function parseTime(timeText) {
    const timeData = _.split(timeText, ":", 2);
    const isNextDay = _.parseInt(timeData[0]) > 24;
    return isNextDay
      ? `${timeData[0] - 24}:${timeData[1]}`
      : `${timeData[0]}:${timeData[1]}`;
  }

  function handleAddFavorite(id) {
    if (!_.some(favorites, (favorite) => favorite === id)) {
      addFavorite(id);
    }
  }

  // console.log(events);

  return (
    <>
      <Paper sx={{ my: { xs: 1 }, p: { xs: 1, md: 1 } }} variant="outlined">
        <Typography component="h1" variant="h6" align="center">
          Timers
        </Typography>
      </Paper>
      <Paper sx={{ my: { xs: 1, md: 1 }, p: { xs: 1, md: 1 } }}>
        <Grid container spacing={1}>
          {_.map(events, (event, index) => {
            const inProgress = event.remainingTime < 0;
            const timeText = parseTime(event.time);
            const eventTime = format(parse(timeText, "HH:mm", new Date()), "HH:mm");
            return (
              <Grid item xs={12} key={`${event.name}-${index}`}>
                <TimerItem
                  event={event}
                  eventImage={event.image}
                  eventName={event.name}
                  eventRemainingTime={event.remainingTime}
                  eventRemainingTimeText={event.remainingTimeText}
                  eventTime={eventTime}
                  inProgress={inProgress}
                  onClick={() => {
                    handleAddFavorite(event.id);
                  }}
                  isFavorite={isFavorite}
                  useStore={useStore}
                />
              </Grid>
            );
          })}
        </Grid>
      </Paper>
    </>
  );
}

function TimerItem(props) {
  const {
    day,
    dayText,
    eventImage,
    eventName,
    eventRemainingTimeText,
    eventTime,
    inProgress,
    isFavorite,
    onClick,
    useStore,
  } = props;
  const currentDay = useStore((state) => state.currentDay); // a number 0-6

  const EventCard = styled(Paper)`
    ${inProgress
      ? `
    border: 1px solid #ac9c73;
    &:hover {
      .TimerItem__hover {
        opacity: 1;
      }
    }
    `
      : `
    &:hover {
      .TimerItem__hover {
        opacity: 1;
      }
    }
    `}
  `;

  const HoverBox = styled(Box)`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    opacity: 0;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    background-color: rgba(0, 0, 0, 0.8);
    cursor: pointer;
  `;

  return (
    <EventCard
      sx={{
        position: "relative",
        padding: "8px",
        display: "flex",
        alignItems: "center",
      }}
      variant="outlined"
      className={inProgress ? "inProgress" : ""}
      onClick={onClick}
    >
      <img
        src={eventImage}
        alt={eventName}
        style={{ width: 32, height: 32, marginRight: 8 }}
      />
      <Box sx={{ width: "100%" }}>
        <Typography>{eventName}</Typography>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography>
            {inProgress ? "In progress" : eventRemainingTimeText}
          </Typography>
          <Typography sx={{ opacity: 0.5 }}>
            {days[currentDay] !== day && isFavorite
              ? `${dayText} ${eventTime}`
              : `${eventTime}`}
          </Typography>
        </Box>
      </Box>
      <HoverBox className="TimerItem__hover">
        {isFavorite ? (
          <>
            <FavoriteBorderIcon fontSize="large" sx={{ mr: 1 }} />
            <Typography>REMOVE FROM FAVORITES</Typography>
          </>
        ) : (
          <>
            <FavoriteIcon fontSize="large" sx={{ mr: 1 }} />
            <Typography>ADD TO FAVORITES</Typography>
          </>
        )}
      </HoverBox>
    </EventCard>
  );
}

const FilterList = React.memo((props) => {
  const { currentDay, rosterStatus, useStore } = props;
  // console.log("renderList");
  return (
    <List sx={{ p: 0 }}>
      <FilterCategory
        category="fever"
        title="Fever"
        currentDay={currentDay}
        useStore={useStore}
        disabled={rosterStatus.grandprix}
      />
      <FilterCategory
        category="adventure"
        title="Adventure Island"
        currentDay={currentDay}
        useStore={useStore}
        disabled={rosterStatus.adv}
      />
      <FilterCategory
        category="chaos"
        title="Chaos Gate"
        currentDay={currentDay}
        useStore={useStore}
        disabled={rosterStatus.chaosgate}
      />
      <FilterCategory
        category="ghostship"
        title="Ghostship"
        currentDay={currentDay}
        useStore={useStore}
      />
      <FilterCategory
        category="fieldboss"
        title="Field Boss"
        currentDay={currentDay}
        useStore={useStore}
        disabled={rosterStatus.cal}
      />
      <FilterCategory
        category="islands"
        title="Islands"
        currentDay={currentDay}
        useStore={useStore}
      />
      <FilterCategory
        category="sailing"
        title="Sailing Co-op"
        currentDay={currentDay}
        useStore={useStore}
      />
      <FilterCategory
        category="pvp"
        title="Proving Grounds"
        currentDay={currentDay}
        useStore={useStore}
      />
    </List>
  );
});

function Favorites(props) {
  const { useStore } = props;
  const favorites = useStore((state) => state.eventSettings.favorites);
  const offset = useStore((state) => state.eventSettings.offset);
  const timezone = useStore((state) => state.eventSettings.timezone);
  const currentTime = useStore((state) => state.currentTime);
  const removeFavorite = useStore((state) => state.removeFavorite);
  const currentTimeAsDate = parse(currentTime,"HH:mm:ss", new Date());
  const currentTimeAsSeconds = differenceInSeconds(currentTimeAsDate, startOfToday());
  const currentDay = useStore((state) => state.currentDay);

  function parseTime(timeText) {
    const timeData = _.split(timeText, ":", 2);
    const isNextDay = _.parseInt(timeData[0]) > 24;
    return isNextDay
      ? `${timeData[0] - 24}:${timeData[1]}`
      : `${timeData[0]}:${timeData[1]}`;
  }

  const events = _.flatMap(timerData);

  function parseFavorites() {
    // console.log("parsedFavs:", list);
    return _.reduce(
        favorites,
        (result, event) => {
          const validEvent = _.find(events, ["id", event]);
          if (validEvent) {
            // if event happens today and hasn't already passed
            if (
                _.has(validEvent.times, days[currentDay]) &&
                _.some(
                    validEvent.times[days[currentDay]],
                    (time) => differenceInSeconds(parse(time, "HH:mm", new Date()), startOfToday()) > currentTimeAsSeconds
                )
            ) {
              validEvent.time = _.reduce(
                  validEvent.times[days[currentDay]],
                  (result, time) => {
                    if (
                        result === "" &&
                        differenceInSeconds(parse(time, "HH:mm", new Date()), startOfToday()) - currentTimeAsSeconds >
                        -180
                    ) {
                      result = time;
                    }
                    return result;
                  },
                  ""
              );
              validEvent.day = days[currentDay];
              result.push(validEvent);
            } else {
              // add 1 day at a time until one works to find nearest day
              const nextDay = _.reduce(
                  [1, 2, 3, 4, 5, 6],
                  (result, addDay) => {
                    const leapDay =
                        _.parseInt(currentDay) + addDay > 6
                            ? _.parseInt(currentDay) + addDay - 7
                            : _.parseInt(currentDay) + addDay;
                    if (result === "" && _.has(validEvent.times, days[leapDay])) {
                      result = days[leapDay];
                    }
                    return result;
                  },
                  ""
              );
              validEvent.time = validEvent["times"][nextDay][0];
              validEvent.day = nextDay;
              result.push(validEvent);
            }
          }
          return result;
        },
        []
    );
  }

  function handleRemove(id) {
    removeFavorite(id);
  }

  const parsedFavorites = _.orderBy(
    _.map(parseFavorites(), (event) => {
      const dayInt = parseInt(_.findKey(days, (day) => day === event.day));
      let remainingDays;
      if (event.day === days[currentDay]) {
        remainingDays = 0;
      } else {
        if (parseInt(currentDay) < dayInt) {
          remainingDays = dayInt - parseInt(currentDay);
        }
        if (parseInt(currentDay) > dayInt) {
          remainingDays = dayInt + 7 - parseInt(currentDay);
        }
      }

      const remainingTime = differenceInSeconds(add(parse(event.time,"HH:mm", new Date()), {days: remainingDays}), startOfToday()) -
        currentTimeAsSeconds;

      return {
        day: event.day,
        dayText: dayText[dayInt],
        id: event.id,
        ilvl: event.ilvl,
        image: event.image,
        location: event.location,
        name: event.name,
        time: event.time,
        remainingDays: remainingDays,
        remainingTime: remainingTime,
        remainingTimeText: formatDuration(intervalToDuration({ start: 0, end: remainingTime * 1000 }), { format: ['hours', 'minutes'] }),
      };
    }),
    "remainingTime"
  );

  // console.log(parsedFavorites);

  return (
    <>
      <Paper sx={{ my: { xs: 1 }, p: { xs: 1, md: 1 } }} variant="outlined">
        <Typography component="h1" variant="h6" align="center">
          Favorites
        </Typography>
      </Paper>
      <Paper sx={{ my: { xs: 1, md: 1 }, p: { xs: 1, md: 1 } }}>
        <Grid container spacing={1}>
          {_.map(parsedFavorites, (event, index) => {
            const inProgress = event.remainingTime < 0;
            const timeText = parseTime(event.time);
            const eventTime = moment(timeText, "HH:mm").format("HH:mm");
            return (
              <Grid item xs={12} key={`${event.name}-${index}`}>
                <TimerItem
                  event={event}
                  eventDay={event.day}
                  eventImage={event.image}
                  eventName={event.name}
                  // eventRemainingDays={event.remainingDays}
                  // eventRemainingTime={event.remainingTime}
                  eventRemainingTimeText={event.remainingTimeText}
                  eventTime={eventTime}
                  inProgress={inProgress}
                  onClick={() => {
                    handleRemove(event.id);
                  }}
                  isFavorite={true}
                  day={event.day}
                  dayText={event.dayText}
                  useStore={useStore}
                />
              </Grid>
            );
          })}
          {parsedFavorites.length === 0 && (
            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <FavoriteIcon fontSize="large" align="center" sx={{ mr: 1 }} />
              <Typography>
                Add an event from the Timers list to keep track of your favorite
                events
              </Typography>
            </Grid>
          )}
        </Grid>
      </Paper>
    </>
  );
}

function FilterCategory(props) {
  const { category, disabled, title, useStore } = props;
  const toggleFilter = useStore((state) => state.toggleFilter);
  const eventSettings = useStore((state) => state.eventSettings);
  return (
    <Accordion disabled={disabled}>
      <AccordionSummary id="fever" expandIcon={<ExpandMoreIcon />}>
        <Typography sx={{ flexShrink: 0, width: "66%" }}>{title}</Typography>
        {disabled && <Typography>Completed</Typography>}
      </AccordionSummary>
      <AccordionDetails style={{ padding: 0 }}>
        <List dense={true}>
          {_.map(timerData[category], (event, index) => {
            return (
              <ListItem
                key={`${event.name}-${index}`}
                role="listitem"
                button
                onClick={() => {
                  toggleFilter(category, event.id);
                }}
                disablePadding
                secondaryAction={
                  event.image && (
                    <Box sx={{ width: 40, height: 40 }}>
                      <img
                        src={event.image}
                        alt={event.name}
                        style={{ width: "100%" }}
                      />
                    </Box>
                  )
                }
              >
                <ListItemIcon>
                  <Checkbox
                    disableRipple
                    checked={
                      _.has(eventSettings, `filter.${category}.${event.id}`)
                        ? eventSettings["filter"][category][event.id]
                        : false
                    }
                  />
                </ListItemIcon>
                <ListItemText
                  primary={event.name}
                  secondary={`[${event.ilvl}]`}
                />
              </ListItem>
            );
          })}
        </List>
      </AccordionDetails>
    </Accordion>
  );
}
