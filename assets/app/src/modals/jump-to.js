// @flow
import * as React from 'react'
import ReactDOM from 'react-dom'
import theme from 'r/theme'
import { type Match, withRouter, Link } from 'react-router-dom'

import { type NounType } from 'r/data/nouns'

const w = 580
const h = 75

type SearchMatch = {|
  name: string,
  id: number,
  campaignId: number,
  type: NounType | 'SESSION',
|}

const getPath = (searchMatch: SearchMatch): string => {
  switch (searchMatch.type) {
    case 'PERSON':
    case 'PLACE':
    case 'THING':
      return `/campaigns/${searchMatch.campaignId}/nouns/${searchMatch.id}`
    case 'SESSION':
      return `/campaigns/${searchMatch.campaignId}/sessions/${searchMatch.id}`
    default:
      throw new Error('Unrecognized match type')
  }
}

type Props = {
  match: Match,
  close: () => void,
}
type State = {|
  value: string,
  searchMatches: Array<SearchMatch>,
  selectedMatchIdx: number,
|}
class JumpTo extends React.Component<Props, State> {
  state = {
    value: '',
    searchMatches: [],
    selectedMatchIdx: 0,
  }
  render() {
    const { searchMatches, value, selectedMatchIdx } = this.state
    const { close } = this.props
    return (
      <div
        css={`
          position: absolute;
          top: 20vh;
          left: calc(50% - ${w / 2}px);
        `}
      >
        <input
          css={`
            width: ${w}px;
            height: ${h}px;
            padding: 20px 32px;
            border: 1px solid ${theme.gray87};
            border-radius: 2px;
            &:focus {
              outline: none;
            }
          `}
          placeholder="Jump to..."
          onChange={this.handleChange}
          value={value}
        />
        <div>
          {searchMatches.map((m, i) => {
            const isSelected = selectedMatchIdx === i
            return (
              <Link
                css={`
                  padding: 10px 32px;
                  background: ${isSelected ? theme.campaignColor : theme.white};
                  color: ${isSelected ? theme.white : theme.textColor};
                  text-decoration: none;
                  display: block;
                `}
                to={getPath(m)}
                onClick={() => {
                  close()
                }}
              >
                {m.name}
              </Link>
            )
          })}
        </div>
      </div>
    )
  }
  componentDidMount() {
    const rootEl = ReactDOM.findDOMNode(this)
    if (rootEl && rootEl instanceof Element) {
      const inputEl = rootEl.querySelector('input')
      if (inputEl) {
        inputEl.focus()
      }
    }

    const wrapSelection = selectedIdx => {
      const { searchMatches } = this.state
      if (searchMatches.length === 0) {
        return 0
      }
      if (selectedIdx === -1) {
        return searchMatches.length - 1
      }
      if (selectedIdx === searchMatches.length) {
        return 0
      }
      return selectedIdx
    }
    document.addEventListener('keydown', (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        this.setState(state => ({
          selectedMatchIdx: wrapSelection(state.selectedMatchIdx + 1),
        }))
      }
      if (e.key === 'ArrowUp') {
        this.setState(state => ({
          selectedMatchIdx: wrapSelection(state.selectedMatchIdx - 1),
        }))
      }
      if (e.key === 'Enter') {
        const { searchMatches, selectedMatchIdx } = this.state
        if (searchMatches.length && rootEl && rootEl instanceof Element) {
          const linkEls = [...rootEl.querySelectorAll('a')]
          linkEls[selectedMatchIdx].click()
          this.props.close()
        }
      }
    })
  }
  handleChange = (e: SyntheticEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget
    this.setState({
      value,
    })

    getQuickSearchMatches(value).then(searchMatches => {
      this.setState({ searchMatches })
    })
  }
}

function getQuickSearchMatches(x: string): Promise<Array<SearchMatch>> {
  return Promise.resolve([
    { name: 'Rod of Wonder', type: 'THING', id: 1, campaignId: 4 },
    { name: 'Bors', type: 'PERSON', id: 3, campaignId: 4 },
    { name: '6: more stuff', type: 'SESSION', id: 6, campaignId: 4 },
  ])
}

export default withRouter(JumpTo)
