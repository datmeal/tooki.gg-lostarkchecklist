import React, { useRef, useState, useEffect } from "react";
import useDeepCompareEffect from "use-deep-compare-effect";
import _ from "lodash";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import moment from "moment";
import { ThemeProvider } from "@mui/material/styles";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
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
import Switch from "@mui/material/Switch";
import Typography from "@mui/material/Typography";

import { timerData, days } from "./timerData";
import { BookmarkAdded, Javascript, Pause, Timer } from "@mui/icons-material";

export default function Events(props) {
  const { theme, useStore, taskStore } = props;
  const currentTime = useStore((state) => state.currentTime);
  const currentTimeAsSeconds = moment.duration(currentTime).asSeconds();
  const currentDay = useStore((state) => state.currentDay); // a number 0-6
  const rosterStatus = taskStore((state) => state.rosterStatus);
  const filter = useStore((state) => state.eventSettings.filter);
  const offset = useStore((state) => state.eventSettings.offset); // add to offset AGS shenanigans, DST
  const timezone = useStore((state) => state.eventSettings.timezone);
  const offsetSeconds = moment.duration(offset, "h").asSeconds();
  const endOfDayAsSeconds = moment.duration("24:00").asSeconds();
  const eventCount = 50; // how many to show, configurable later, not sure why the number of items shown is weird atm
  // console.log(moment(currentTime, "HH:mm:ss").subtract(1, "days").format("e"));
  const previousDay =
    days[moment(currentDay, "e").subtract(1, "days").format("e")]; // string "sat"
  const nextDay = days[moment(currentDay, "e").add(1, "days").format("e")]; // string "sat"
  // console.log(previousDay);
  // console.log("filter:", filter);
  // hooks
  //   const [interval, setInterval] = useState(0);

  //   console.log(currentTime, moment.duration(currentTime).asMilliseconds());

  const parseTimezone = (timezone) => {
    const timezones = {
      EST: 0,
      PST: 3,
      CET: -5,
      WET: -4,
    };
    return _.findKey(timezones, (zone) => {
      return zone === timezone;
    });
  };

  // Event Math
  function parseEvents() {
    // console.log("timerData:", timerData);
    // console.log("flatMappedTimerData:", _.flatMap(timerData));
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
    const events = categories.flatMap((category) => category);
    // console.log("allEvents:", events);
    // .add(offset, "hours")
    const allEvents = _.flatMap(events, (event) => {
      // console.log("event:", event);
      return _.flatMap(event.time, (time, index) => {
        const timeAsSeconds = moment.duration(time).asSeconds();
        let remainingTimeAsSeconds;
        if (
          // past 24:00
          timeAsSeconds > endOfDayAsSeconds &&
          _.includes(event.days, previousDay)
        ) {
          const eventTimeAsSeconds = moment
            .duration(event.time[index])
            .add(offsetSeconds, "seconds")
            .asSeconds();
          // if (event.name === "Moake") {
          //   console.log(event.name, eventTimeAsSeconds);
          // }
          remainingTimeAsSeconds =
            eventTimeAsSeconds - endOfDayAsSeconds - currentTimeAsSeconds;
        } else if (
          // tomorrow's events, show as remaining time + 24h
          _.includes(event.days, nextDay) &&
          moment.duration(time).asSeconds() < currentTimeAsSeconds
        ) {
          console.log("nextdayevent:", event);
          remainingTimeAsSeconds =
            moment.duration(event.time[index]).asSeconds() +
            moment.duration(24, "hours").asSeconds() +
            offsetSeconds -
            moment.duration(currentTime).asSeconds(); // 46200, 60600 seconds
        } else {
          // normal time
          remainingTimeAsSeconds =
            moment.duration(event.time[index]).asSeconds() +
            offsetSeconds -
            moment.duration(currentTime).asSeconds(); // 46200, 60600 seconds
        }
        const remainingTimeText = moment
          .duration(remainingTimeAsSeconds, "seconds")
          .humanize();
        return {
          category: event.category,
          days: event.days,
          image: event.image,
          ilvl: event.ilvl,
          id: event.id,
          location: event.location,
          name: event.name,
          time: time,
          remainingTime: remainingTimeAsSeconds,
          remainingTimeText: remainingTimeText,
        };
      });
    });
    // console.log("allEvents:", allEvents);
    const filteredEvents = _.filter(allEvents, (event) => {
      return filter[event.category][event.id];
    });
    // console.log("filteredEvents:", filteredEvents);
    const todaysEvents = _.filter(filteredEvents, (event) => {
      // Today's Events
      if (
        _.includes(event.days, days[currentDay]) &&
        moment.duration(event.time).asSeconds() < endOfDayAsSeconds
      ) {
        return true;
      }
      // Yesterday's Events after 11:59PM
      if (
        _.includes(event.days, previousDay) &&
        moment.duration(event.time).asSeconds() > endOfDayAsSeconds
      ) {
        return true;
      }
      // Tomorrow's Events before current time?
      if (
        _.includes(event.days, nextDay) &&
        moment.duration(event.time).asSeconds() < currentTimeAsSeconds
      ) {
        return true;
      }
      return false;
    });
    // console.log("TodaysEvents:", todaysEvents);

    const upcomingEvents = _.filter(todaysEvents, (event) => {
      const upcoming = event.remainingTime > -180;
      return upcoming;
    });

    // console.log("upcoming:", upcomingEvents);

    const sortedEvents = _.slice(
      _.orderBy(upcomingEvents, "remainingTime"),
      0,
      eventCount
    );
    // console.log("sorted:", sortedEvents);
    // console.log(rosterStatus);
    return sortedEvents;
  }

  return (
    <ThemeProvider theme={theme}>
      <Typography variant="h4" component="h1" align="center">
        {moment(currentTime, "HH:mm:ss")
          // .add(offset, "hours")
          .subtract(timezone, "hours")
          .format("HH:mm:ss")}
        {` ${parseTimezone(timezone)}`}
      </Typography>
      <Typography align="center">
        {moment(currentDay, "e").subtract(timezone, "hours").format("dddd")}
      </Typography>
      <Box>
        <TimezoneControl timezone={timezone} useStore={useStore} />
      </Box>
      <Paper sx={{ my: 1, p: { xs: 1, md: 1 } }}>
        <Typography component="h1" variant="h6" align="center">
          Timeline
        </Typography>
      </Paper>
      <Timeline theme={theme} useStore={useStore} />
      <Grid container spacing={1}>
        <Grid item md={4} sm={6} xs={0}>
          <Favorites theme={theme} useStore={useStore} taskStore={taskStore} />
        </Grid>
        <Grid item md={4} sm={6} xs={12}>
          <Timers
            events={parseEvents()}
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
            <Typography align="center">
              Please send any feedback to Salty#1961
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

function TimezoneControl(props) {
  const timezones = {
    east: 0,
    west: 3,
    euc: -5,
    euw: -4,
  };

  const { timezone, useStore } = props;
  const [value, setValue] = React.useState(timezone);
  const setTimezone = useStore((state) => state.setTimezone);
  const setOffset = useStore((state) => state.setOffset);

  const handleRadioChange = (event) => {
    const value = _.parseInt(event.target.value);
    setValue(value);
    setTimezone(value);
    // US
    if (value === 0 || value === 3) {
      setOffset(0);
    }
    // EU
    if (value === -5 || value === -4) {
      setOffset(-5);
    }
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
          label="US East"
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
  const currentTime = useStore((state) => state.currentTime);
  const setCurrentTime = useStore((state) => state.setCurrentTime);
  const currentDay = useStore((state) => state.currentDay);
  const setCurrentDay = useStore((state) => state.setCurrentDay);
  const [indicatorPosition, setIndicatorPosition] = useState(0);

  // Clock math
  const offset = 1; // add to time for AGS shenanigans
  const currentTimeAsMilli = moment
    .duration(currentTime, "HH:mm:ss")
    .asMilliseconds();
  const startTimeAsMilli = moment.duration("00:00:00").asMilliseconds();
  const endTimeAsMilli = moment.duration("24:00:00").asMilliseconds();
  //   const endTimeAsMilli = moment.duration("24:00:00").asMilliseconds();
  //   console.log(currentTimeAsMilli, startTimeAsMilli, endTimeAsMilli);
  //   console.log("currentTime%", (currentTimeAsMilli / endTimeAsMilli) * 100);

  //   console.log(currentTime, moment.duration(currentTime).asMilliseconds());
  //   console.log(currentTime); // 01:59:57

  // Refreshes clock, temporarily disabled for developing
  useEffect(() => {
    function refreshClock() {
      setCurrentTime(moment().utc().subtract(4, "hours").format("HH:mm:ss"));
      setCurrentDay(moment().utc().subtract(4, "hours").format("e"));
      // Test Time
      // setCurrentTime(moment("23:55", "HH:mm").format("HH:mm:ss"));
      // setCurrentDay(moment("23:55", "HH:mm").format("e"));
    }

    const timerId = setInterval(refreshClock, 1000);
    return function cleanup() {
      clearInterval(timerId);
    };
  }, [setCurrentTime, setCurrentDay]);

  // Auto moves hand
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
  const { events, useStore } = props;
  const offset = useStore((state) => state.eventSettings.offset);
  const timezone = useStore((state) => state.eventSettings.timezone);

  const addFavorite = useStore((state) => state.addFavorite);

  function parseTime(timeText) {
    const timeData = _.split(timeText, ":", 2);
    const isNextDay = _.parseInt(timeData[0]) > 24;
    return isNextDay
      ? `${timeData[0] - 24}:${timeData[1]}`
      : `${timeData[0]}:${timeData[1]}`;
  }

  return (
    <>
      <Paper sx={{ my: { xs: 1 }, p: { xs: 1, md: 1 } }}>
        <Typography component="h1" variant="h6" align="center">
          Timers
        </Typography>
      </Paper>
      <Paper sx={{ my: { xs: 1, md: 1 }, p: { xs: 1, md: 1 } }}>
        <Grid container spacing={1}>
          {_.map(events, (event, index) => {
            const inProgress = event.remainingTime < 0;
            const timeText = parseTime(event.time);
            const eventTime = moment(timeText, "HH:mm")
              .subtract(timezone, "hours")
              .add(offset, "hours")
              .format("HH:mm");
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
                    console.log("You clicked me:", event);
                    addFavorite(event);
                  }}
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
    eventImage,
    eventName,
    eventRemainingTimeText,
    eventTime,
    inProgress,
    onClick,
  } = props;

  const EventCard = styled(Paper)`
    &:hover {
      background-color: pink;
    }
    ${inProgress && "border: 1px solid #ac9c73"}
  `;

  return (
    <EventCard
      sx={{ padding: "8px", display: "flex", alignItems: "center" }}
      variant="outlined"
      className={inProgress ? "inProgress" : ""}
      onClick={onClick}
    >
      <img
        src={eventImage}
        alt={eventName}
        style={{ width: 32, height: 32, marginRight: 8 }}
      ></img>
      <Box sx={{ width: "100%" }}>
        <Typography>{eventName}</Typography>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography>
            {inProgress ? "In progress" : eventRemainingTimeText}
          </Typography>
          <Typography sx={{ opacity: 0.5 }}>{eventTime}</Typography>
        </Box>
      </Box>
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
  const favorites = useStore((state) => state.favorites);
  const offset = useStore((state) => state.eventSettings.offset);
  const timezone = useStore((state) => state.eventSettings.timezone);

  function parseTime(timeText) {
    const timeData = _.split(timeText, ":", 2);
    const isNextDay = _.parseInt(timeData[0]) > 24;
    return isNextDay
      ? `${timeData[0] - 24}:${timeData[1]}`
      : `${timeData[0]}:${timeData[1]}`;
  }

  // console.log(favorites);
  return (
    <>
      <Paper sx={{ my: { xs: 1 }, p: { xs: 1, md: 1 } }}>
        <Typography component="h1" variant="h6" align="center">
          Favorites
        </Typography>
      </Paper>
      <Paper sx={{ my: { xs: 1, md: 1 }, p: { xs: 1, md: 1 } }}>
        <Grid container spacing={1}>
          {_.map(favorites, (event, index) => {
            const inProgress = event.remainingTime < 0;
            const timeText = parseTime(event.time);
            const eventTime = moment(timeText, "HH:mm")
              .subtract(timezone, "hours")
              .add(offset, "hours")
              .format("HH:mm");
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
                    console.log("You clicked me:", event);
                  }}
                />
              </Grid>
            );
          })}
        </Grid>
      </Paper>
    </>
  );
}

function FilterCategory(props) {
  const { category, disabled, title, currentDay, useStore } = props;
  const toggleFilter = useStore((state) => state.toggleFilter);
  const eventSettings = useStore((state) => state.eventSettings);
  const endOfDay = moment.duration("24:00").asSeconds();
  return (
    <Accordion disabled={disabled}>
      <AccordionSummary id="fever" expandIcon={<ExpandMoreIcon />}>
        <Typography sx={{ flexShrink: 0, width: "66%" }}>{title}</Typography>
        {disabled && <Typography>Completed</Typography>}
      </AccordionSummary>
      <AccordionDetails style={{ padding: 0 }}>
        <List dense={true}>
          {_.map(timerData[category], (event, index) => {
            const isToday = _.has(event, "days")
              ? _.includes(event.days, days[currentDay])
                ? true
                : _.includes(event.days, days[currentDay - 1]) &&
                  _.some(event.time, (time) => {
                    return moment.duration(time).asSeconds() > endOfDay;
                  })
              : false;
            return (
              isToday && (
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
              )
            );
          })}
        </List>
      </AccordionDetails>
    </Accordion>
  );
}
