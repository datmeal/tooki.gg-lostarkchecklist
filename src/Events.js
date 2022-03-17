import React, { useState, useEffect } from "react";
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
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

import { timerData, days } from "./timerData";
import { Javascript, Pause, Timer } from "@mui/icons-material";

export default function Events(props) {
  const { theme, useStore, taskStore } = props;
  const currentTime = useStore((state) => state.currentTime);
  const currentDay = useStore((state) => state.currentDay);
  const rosterStatus = taskStore((state) => state.rosterStatus);
  const filter = useStore((state) => state.eventSettings.filter);
  const offset = 1; // add to offset AGS shenanigans
  // console.log("filter:", filter);
  // hooks
  //   const [interval, setInterval] = useState(0);

  //   console.log(currentTime, moment.duration(currentTime).asMilliseconds());

  // Event Math
  const sortedEvents = _.orderBy(
    _.flatMap(timerData, (category, name) => {
      // if category is finished on checklist, omit?
      if (rosterStatus.adv && name === "adventure") {
        return [];
      } else if (rosterStatus.chaosgate && name === "chaos") {
        return [];
      } else if (rosterStatus.cal && name === "fieldboss") {
        return [];
      } else if (rosterStatus.ghostship && name === "ghostship") {
        return [];
      } else if (rosterStatus.grandprix && name === "fever") {
        return [];
      } else {
        // console.log(category, name);
        // console.log(filter[name]);
        return _.flatMap(category, (event) => {
          // if event is filtered, skip it
          return (
            filter[name][event.id] &&
            _.flatMap(event.time, (item, index) => {
              const remainingTimeAsSeconds =
                moment.duration(event.time[index]).asSeconds() -
                moment.duration(currentTime).asSeconds(); // 46200, 60600 seconds
              return {
                days: event.days,
                ilvl: event.ilvl,
                id: event.id,
                image: event.image,
                location: event.location,
                name: event.name,
                remainingTime: remainingTimeAsSeconds,
                time: item,
              };
              // return { ...timerData[category][event] };
            })
          );
        });
      }
    }),
    "remainingTime"
  );
  // console.log(sortedEvents);
  // console.log(rosterStatus);

  return (
    <ThemeProvider theme={theme}>
      <Typography variant="h4" component="h1" align="center">
        {moment(currentTime, "HH:mm:ss")
          .add(offset, "hours")
          .format("HH:mm:ss")}
        (EST)
      </Typography>
      <Typography align="center">Warning: Heavily under development</Typography>
      <Paper sx={{ my: 1, p: { xs: 1, md: 1 } }}>
        <Typography component="h1" variant="h6" align="center">
          Timeline
        </Typography>
      </Paper>
      <Timeline events={sortedEvents} theme={theme} useStore={useStore} />
      <Grid container spacing={1}>
        {/* <Grid item xs={3}>
          <Timers
            events={sortedEvents}
            theme={theme}
            useStore={useStore}
            taskStore={taskStore}
          />
        </Grid> */}
        <Grid item xs={6}>
          <Timers
            events={sortedEvents}
            theme={theme}
            useStore={useStore}
            taskStore={taskStore}
          />
        </Grid>
        <Grid item xs={6}>
          <Paper sx={{ my: 1, p: { xs: 1, md: 1 } }}>
            <Typography component="h1" variant="h6" align="center">
              Filter
            </Typography>
          </Paper>
          <FilterList
            theme={theme}
            currentDay={currentDay}
            useStore={useStore}
          />
        </Grid>
      </Grid>
    </ThemeProvider>
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
    .add(offset, "hours")
    .asMilliseconds();
  const startTimeAsMilli = moment.duration("00:00:00").asMilliseconds();
  const endTimeAsMilli = moment.duration("24:00:00").asMilliseconds();
  //   const endTimeAsMilli = moment.duration("24:00:00").asMilliseconds();
  //   console.log(currentTimeAsMilli, startTimeAsMilli, endTimeAsMilli);
  //   console.log("currentTime%", (currentTimeAsMilli / endTimeAsMilli) * 100);

  function refreshClock() {
    setCurrentTime(moment().utc().subtract(5, "hours").format("HH:mm:ss"));
    setCurrentDay(moment().utc().subtract(5, "hours").day());
  }

  //   console.log(currentTime, moment.duration(currentTime).asMilliseconds());
  //   console.log(currentTime); // 01:59:57

  // Refreshes clock, temporarily disabled for developing
  useEffect(() => {
    const timerId = setInterval(refreshClock, 1000);
    return function cleanup() {
      clearInterval(timerId);
    };
  }, []);

  // Auto moves hand
  useEffect(() => {
    setIndicatorPosition((currentTimeAsMilli / endTimeAsMilli) * 100);
  });

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
  const { events, theme, useStore, taskStore } = props;

  const currentDay = useStore((state) => state.currentDay);
  const currentTime = useStore((state) => state.currentTime);
  const setCurrentTime = useStore((state) => state.setCurrentTime);
  const offset = moment.duration("-1:00").asSeconds();
  const filter = useStore((state) => state.eventSettings.filter);
  //   const remainingTimeText = moment
  //     .duration(remainingTimeAsSeconds, "seconds")
  //     .humanize();

  //   console.log("timerData:", timerData);
  // sort the events before rendering them...

  // console.log(days[currentDay]);
  // console.log(_.includes(["tue", "thu"], days[currentDay]));
  // console.log(timerData.adventure);
  // console.log(
  //   _.find(timerData.adventure, (event) => {
  //     return event.name === "Forpe";
  //   })
  // );
  // if advisland is done on checklist, remove all advislands

  return (
    <>
      <Paper sx={{ my: { xs: 3, md: 1 }, p: { xs: 1, md: 1 } }}>
        <Typography component="h1" variant="h6" align="center">
          Timers
        </Typography>
      </Paper>
      <Paper sx={{ my: { xs: 3, md: 1 }, p: { xs: 1, md: 1 } }}>
        <Grid container spacing={1}>
          {_.map(events, (event, index) => {
            // TODO: if "day" is today OR yesterday and time > 24:00
            const isToday = _.includes(event.days, days[currentDay]);
            const isDone = false;
            return (
              event.remainingTime + offset > 0 &&
              isToday &&
              !isDone && (
                <Grid item xs={6} key={`${event.name}-${index}`}>
                  <TimerItem
                    event={event}
                    eventImage={event.image}
                    eventName={event.name}
                    eventRemainingTime={event.remainingTime}
                    eventTime={event.time}
                  />
                </Grid>
              )
            );
          })}
        </Grid>
      </Paper>
    </>
  );
}

function TimerItem(props) {
  const { eventImage, eventName, eventRemainingTime, eventTime } = props;
  const offset = moment.duration("-1:00").asSeconds();
  const remainingTimeText = moment
    .duration(eventRemainingTime + offset, "seconds")
    .humanize();

  return (
    <Paper
      sx={{ padding: "8px", display: "flex", alignItems: "center" }}
      variant="outlined"
    >
      <img
        src={eventImage}
        alt={eventName}
        style={{ width: 32, height: 32, marginRight: 8 }}
      ></img>
      <Box sx={{ width: "100%" }}>
        <Typography>{eventName}</Typography>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography>{remainingTimeText}</Typography>
          <Typography sx={{ opacity: 0.5 }}>{eventTime}</Typography>
        </Box>
      </Box>
    </Paper>
  );
}

const FilterList = React.memo((props) => {
  const { currentDay, useStore } = props;
  // console.log("renderList");
  return (
    <List sx={{ p: 0 }}>
      <FilterCategory
        category="fever"
        title="Fever"
        currentDay={currentDay}
        useStore={useStore}
      />
      <FilterCategory
        category="adventure"
        title="Adventure Island"
        currentDay={currentDay}
        useStore={useStore}
      />
      <FilterCategory
        category="chaos"
        title="Chaos Gate"
        currentDay={currentDay}
        useStore={useStore}
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

function FilterCategory(props) {
  const { category, title, currentDay, useStore } = props;
  const toggleFilter = useStore((state) => state.toggleFilter);
  const eventSettings = useStore((state) => state.eventSettings);
  return (
    <Accordion>
      <AccordionSummary id="fever" expandIcon={<ExpandMoreIcon />}>
        <Typography>{title}</Typography>
      </AccordionSummary>
      <AccordionDetails style={{ padding: 0 }}>
        {_.map(timerData[category], (event) => {
          const isToday = _.includes(event.days, days[currentDay]);
          return (
            isToday && (
              <ListItem
                key={event.name}
                role="listitem"
                button
                onClick={() => {
                  toggleFilter(category, event.id);
                }}
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
                <ListItemText primary={event.name} />
              </ListItem>
            )
          );
        })}
      </AccordionDetails>
    </Accordion>
  );
}
