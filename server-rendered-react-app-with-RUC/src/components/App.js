import React from 'react'
import universal from 'react-universal-component'
import Loading from './Loading'
import NotFound from './NotFound'
import './App.css'

const UniversalTab = universal(({ tab }) => import(`./${tab}`), {
  error: NotFound,
  minDelay: 500,
  alwaysDelay: true,
  //   loading: Loading,
  loadingTransition: false,
})

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = { selected: 'Home', loading: false }
  }

  componentDidMount() {
    // UniversalTab.preload({ tab: 'About' }) // Preload pages that maybe called upon after everything else has finished loading
  }

  loadStart = () => {
    this.setState({ loading: true })
  }

  loadEnd = () => {
    this.setState({ loading: false })
  }

  render() {
    return (
      <div>
        {this.state.loading && <Loading />}
        <div className={this.state.loading ? 'loading' : ''}>
          <UniversalTab
            onBefore={this.loadStart}
            onAfter={this.loadEnd}
            //isLoading={this.state.loading} // passes this to the universal higher order component to determine loading transition
            tab={this.state.selected}
            onError={err => console.log(err)}
          />
        </div>

        <button
          onClick={() => this.setState({ selected: 'Home' })}
          onMouseEnter={() => UniversalTab.preload({ tab: 'Home' })} // Dynamic load pages based on mouse events to perceive ahead of time that the user may click to navigate
        >
          Home
        </button>
        <button
          onClick={() => this.setState({ selected: 'About' })}
          onMouseEnter={() => UniversalTab.preload({ tab: 'About' })}
        >
          About
        </button>
        <button
          onClick={() => this.setState({ selected: 'Contact' })}
          onMouseEnter={() => UniversalTab.preload({ tab: 'Contact' })}
        >
          Contact
        </button>
        <button onClick={() => this.setState({ selected: 'NotFound' })}>
          Not Found
        </button>
      </div>
    )
  }
}
