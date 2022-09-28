import React, { Component, useState } from "react"
import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
// import "./globals.css"
import locations from '../locations.json';

const WheelControls = (slider) => {
  let touchTimeout
  let position
  let wheelActive

  function dispatch(e, name) {
    position.x -= e.deltaX
    position.y -= e.deltaY
    slider.container.dispatchEvent(
      new CustomEvent(name, {
        detail: {
          x: position.x,
          y: position.y,
        },
      })
    )
  }

  function wheelStart(e) {
    position = {
      x: e.pageX,
      y: e.pageY,
    }
    dispatch(e, "ksDragStart")
  }

  function wheel(e) {
    dispatch(e, "ksDrag")
  }

  function wheelEnd(e) {
    dispatch(e, "ksDragEnd")
  }

  function eventWheel(e) {
    e.preventDefault()
    if (!wheelActive) {
      wheelStart(e)
      wheelActive = true
    }
    wheel(e)
    clearTimeout(touchTimeout)
    touchTimeout = setTimeout(() => {
      wheelActive = false
      wheelEnd(e)
    }, 50)
  }

  slider.on("created", () => {
    slider.container.addEventListener("wheel", eventWheel, {
      passive: false,
    })
  })
}

const Carousel = (props) => {
    const onTrigger = (message) => 
    {
        props.parentCallback(message);
    }
  const [sliderRef] = useKeenSlider(
    {
      loop: true,
      rubberband: false,
      slideChanged(slider) 
      {
        onTrigger(slider.track.details.rel);
      }
    },
    [WheelControls]
  )

  return (
    <div ref={sliderRef} className="keen-slider" style={{ position: "absolute", bottom: "10%", right: "10%", zIndex: "10000", width: 384, height: 250 }}>
      {
          locations.places.map( (location, index) =>
            <div className="keen-slider__slide number-slide1" key={index}>{location.latitude}, {location.longitude}</div>
          )}
    </div>
  )
}

export default Carousel;