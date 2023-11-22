import Notification from "./Notification"

function Login(props) {
  const {
    handleChangeUsername,
    handleChangePassword,
    handleSubmit,
    username,
    password,
    errorMessage,
  } = props

  return (
    <div>
      <h2>log in to application</h2>

      <Notification message={errorMessage} style="error" />

      <form onSubmit={handleSubmit}>
        <div>
          <label>username</label>
          <input
            type="text"
            value={username}
            name="Username"
            onChange={handleChangeUsername}
          />
        </div>

        <div>
          <label>password</label>
          <input
            type="password"
            value={password}
            name="Password"
            onChange={handleChangePassword}
          />
        </div>

        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default Login
