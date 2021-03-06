import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import "./header.css"
import { useAuth0 } from "@auth0/auth0-react"
import useFeatureFlags from "../hooks/use-feature-flags"
import CheckRole from "./check-role"

const UserNav = () => {
  const { isLoading, isAuthenticated, logout, loginWithRedirect } = useAuth0()

  const { featureAuth } = useFeatureFlags()
  if (!featureAuth) return null

  if (isLoading) return null

  if (isAuthenticated)
    return (
      <ul>
        <CheckRole roles={["admin"]} silent={true}>
          <li>
            <Link
              to="/admin"
              getProps={partlyActive()}
              activeClassName="active"
            >
              Admin
            </Link>
          </li>
        </CheckRole>
        <li>
          <button
            className="button"
            onClick={() => {
              logout({ returnTo: window.location.origin })
            }}
          >
            Logout
          </button>
        </li>
      </ul>
    )

  return (
    <ul>
      <li>
        <button className="button" onClick={loginWithRedirect}>
          Login
        </button>
      </li>
    </ul>
  )
}

const partlyActive = className => ({ isPartiallyCurrent }) => ({
  className: className + (isPartiallyCurrent ? ` active` : ``),
})

const Header = () => {
  const { featureAuth } = useFeatureFlags()

  return (
    <header>
      <div>
        <Link to="/">
          <img src="/images/logo.png" alt="Hoist Logo" />
        </Link>
      </div>
      <nav>
        <ul>
          <li>
            <Link to="/" activeClassName="active">
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              getProps={partlyActive()}
              activeClassName="active"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to="/build"
              getProps={partlyActive()}
              activeClassName="active"
            >
              Build
            </Link>
          </li>
          <li hidden={!featureAuth}>
            <Link to="/account" activeClassName="active">
              Account
            </Link>
          </li>
        </ul>
        <UserNav />
      </nav>
    </header>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
