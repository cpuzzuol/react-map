import React from 'react';
import './App.css';
import { geoCentroid } from "d3-geo";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  Annotation
} from "react-simple-maps";

import allStates from "./data/allstates.json";

const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

const offsets = {
  VT: [50, -8],
  NH: [34, 2],
  MA: [30, -1],
  RI: [28, 2],
  CT: [35, 10],
  NJ: [34, 1],
  DE: [33, 0],
  MD: [47, 10],
  DC: [49, 21]
};

const partyColors = [
  { party: "R", color: '#c0392b' },
  { party: "D", color: '#2980b9' },
  { party: "I", color: '#8e44ad' },
  { party: "L", color: '#f1c40f' },
  { party: "G", color: '#27ae60' },
  { party: "C", color: '#f39c12' }
]


function loadClient() {
  const script = document.createElement("script");
  script.src = "https://apis.google.com/js/client.js";

  script.onload = () => {
    window.gapi.load('client', () => {
      window.gapi.client.setApiKey('AIzaSyB63xFZV5j9RZOLH_bF-EvR3i5nUA26f58')
      // window.gapi.client.setClientId(types.CLIENT_ID)
      // window.gapi.client.setDiscoveryDocs(types.DISCOVERY_DOCS)
      // window.gapi.client.setScope(types.SCOPE)
      window.gapi.client.load('client:auth2', 'v3', () => {
        console.log("gapi is ready")
        this.setState({ gapiReady: true });
      });
    });
  };

  document.body.appendChild(script);
}

function componentDidMount() {
  loadClient();
}


// https://www.googleapis.com/civicinfo/v2/representatives/ocd-division/country:us/state:mi
function getReps(state) {
  fetch(`https://www.googleapis.com/civicinfo/v2/representatives/ocd-division/country:us/state:${state}?key=AIzaSyB63xFZV5j9RZOLH_bF-EvR3i5nUA26f58`)
    .then(res => res.json())
    .then(
      (result) => {
        console.log(result)
      },
      // Note: it's important to handle errors here
      // instead of a catch() block so that we don't swallow
      // exceptions from actual bugs in components.
      (error) => {
        console.log(error)
      }
    )
}

function stateReps() {
  allStates.forEach(st => {
    const state = st.id.toLowerCase()
    if(state === 'mi') {
      getReps(state)
    }
  })
}

function Bob() {
  stateReps()
  return (
    <ComposableMap projection="geoAlbersUsa">
      <Geographies geography={geoUrl}>
        {({ geographies }) => (
          <>
            {geographies.map(geo => {
              const cur = allStates.find(s => s.val === geo.id);
              const fillColor = partyColors.find(p => p.party === cur.vote);
              return (
                <Geography
                  key={geo.rsmKey}
                  stroke="#FFF"
                  geography={geo}
                  fill={fillColor.color}
                />
              )
            })},
            {geographies.map(geo => {
              const centroid = geoCentroid(geo);
              const cur = allStates.find(s => s.val === geo.id);
              return (
                <g key={geo.rsmKey + "-name"}>
                  {cur &&
                  centroid[0] > -160 &&
                  centroid[0] < -67 &&
                  (Object.keys(offsets).indexOf(cur.id) === -1 ? (
                    <Marker coordinates={centroid}>
                      <text y="2" fontSize={10} textAnchor="middle">
                        {cur.id}
                      </text>
                    </Marker>
                  ) : (
                    <Annotation
                      subject={centroid}
                      dx={offsets[cur.id][0]}
                      dy={offsets[cur.id][1]}
                    >
                      <text x={4} fontSize={10} alignmentBaseline="middle">
                        {cur.id}
                      </text>
                    </Annotation>
                  ))}
                </g>
              );
            })}
          </>
        )}
      </Geographies>
    </ComposableMap>
  );
}

export default Bob;
