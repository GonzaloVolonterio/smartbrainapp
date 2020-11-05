import React from 'react';

class Signin extends React.Component {
  constructor(props) {                                            //PARA CREAR EL ESTADO == CONSTRUCTOR() SUPER() THIS.STATE PROPS = para que se pueda usar ONCHANGE ONROUTE y otros ON
    super(props);
    this.state = {
      signInEmail: '',
      signInPassword: ''
    }
  }

  onEmailChange = (event) => {
    this.setState({signInEmail: event.target.value})              //THIS.SETSTATE SE PUEDE PONER XQ SE DECLARO EL ESTADO
  }

  onPasswordChange = (event) => {
    this.setState({signInPassword: event.target.value})
  }

  onSubmitSignIn = () => {
    fetch('https://morning-refuge-11282.herokuapp.com/signin', {      // ENVIAR INFROMACION AL SV
      method: 'post',                                                 // PARA HACER UNA SOLICITUD POST XQ SINO X DEFECTO HACE UNA SOLU GET
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({                                          // COM ES BACK-END NO SE PUEDE MANDAR JAVA ENTNCES USO JSON PARA LOS OBJETIVOS
        email: this.state.signInEmail,
        password: this.state.signInPassword
      })
    })
      .then(response => response.json())
      .then(user => {
        if (user.id) {                                                 //EL .ID HACE Q SE VERIFIGUE SI EL USUARIO ESTA REGISTRADO
          this.props.loadUser(user)
          this.props.onRouteChange('home');                            // ESTO HACE QUE TE MANDE A HOME DSPS DE Q T LOGIAS
        }
      })
  }

  render() {
    const { onRouteChange } = this.props;                                 //DESESTRUCTAR Y QUE SE MAS LINDO Y MEJOR EL CODIGO
    return (
      <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
        <main className="pa4 black-80">
          <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f1 fw6 ph0 mh0">Sign In</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="email"
                  name="email-address"
                  id="email-address"
                  onChange={this.onEmailChange}
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                <input
                  className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="password"
                  name="password"
                  id="password"
                  onChange={this.onPasswordChange}
                />
              </div>
            </fieldset>
            <div className="">
              <input
                onClick={this.onSubmitSignIn}                               // TE MANDA A LA PAGINA PRINCIPAL XQ EL ESTADO ESTA DECLARO ARRIBA
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                type="submit"
                value="Sign in"
              />
            </div>
            <div className="lh-copy mt3">
              <p  onClick={() => onRouteChange('register')} className="f6 link dim black db pointer">Register</p>
            </div>
          </div>
        </main>
      </article>
    );
  }
}

export default Signin;