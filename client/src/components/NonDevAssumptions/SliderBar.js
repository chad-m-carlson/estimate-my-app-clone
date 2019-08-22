import React, {useState} from 'react';
import { Slider, Rail, Handles, Tracks,  } from 'react-compound-slider'
import { Handle, Track, TooltipRail } from './SliderComponents'


const sliderStyle = {
  position: 'relative',
  width: '100%',
}

const domain = [0, 25]


const SliderBar = (props) => {
  const defaultValues = [props.defaultValue * 100]
  const [values, setValues] = useState(defaultValues);
  const [update, setUpdate] = useState(defaultValues);

  
  const onUpdate = update => {
    setUpdate(update)
  }
  
  const onChange = values => {
    setValues(values)
    let nonDevTime = Math.round((values[0]/100 * props.coreDevTime) * 1e1) / 1e1
    props.handleChange(nonDevTime, ...values, props.name)
  }

  return(
    <div>
        <Slider
          mode={1}
          step={1}
          domain={domain}
          rootStyle={sliderStyle}
          onUpdate={onUpdate}
          onChange={onChange}
          values={values}
          >
          <Rail>{railProps => <TooltipRail {...railProps} />}</Rail>
          <Handles>
            {({ handles, activeHandleID, getHandleProps }) => (
              <div className="slider-handles">
                {handles.map(handle => (
                  <Handle
                  key={handle.id}
                  handle={handle}
                  domain={domain}
                  isActive={handle.id === activeHandleID}
                  getHandleProps={getHandleProps}
                  />
                  ))}
              </div>
            )}
          </Handles>
          <Tracks right={false}>
            {({ tracks, getTrackProps }) => (
              <div className="slider-tracks">
                {tracks.map(({ id, source, target }) => (
                  <Track
                  key={id}
                  source={source}
                  target={target}
                  getTrackProps={getTrackProps}
                  />
                  ))}
              </div>
            )}
          </Tracks>
        </Slider>
      </div>
  );
};

export default SliderBar;