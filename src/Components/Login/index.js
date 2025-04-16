import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class Login extends Component {
  state = {userdetais: '', passworddetails: '', errormsg: ''}

  changingusername = event => {
    this.setState({userdetais: event.target.value})
  }

  changingpassword = event => {
    this.setState({passworddetails: event.target.value})
  }

  submitedSuccess = token => {
    const {history} = this.props
    Cookies.set('jwt_token', token, {expires: 30})

    history.replace('/')
  }

  onSubmission = async event => {
    event.preventDefault()
    this.setState({errormsg: ''})
    const {userdetais, passworddetails} = this.state
    const url = 'https://apis.ccbp.in/login'

    const details = {username: userdetais, password: passworddetails}
    const options = {
      method: 'POST',
      body: JSON.stringify(details),
    }
    const response = await fetch(url, options)
    console.log(response)
    if (response.ok) {
      const data = await response.json()
      console.log(data)
      this.submitedSuccess(data.jwt_token)
    } else {
      this.setState({errormsg: '*Enter Valid Details!'})
    }
  }

  render() {
    const {userdetais, passworddetails, errormsg} = this.state
    const token = Cookies.get('jwt_token')
    if (token) {
      return <Redirect to="/" />
    }

    return (
      <div>
        <div data-testid="hola" className="hola">
          <img
            alt="bg-image"
            style={{
              width: '457.803652622438px',
              height: '547.03979900777912px',
              position: 'absolute', // Necessary for top and left to work
              top: '-100px',
              left: '-100.13px',
              transform: 'rotate(23.8deg)', // Angle converted to positive
            }}
            src="https://s3-alpha-sig.figma.com/img/e9ab/a92c/49e0323b30f14ad832e9d171a992f24b?Expires=1745193600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=OE9Y3qz1~EUfuIcH7~oSw9RkvjKS-OC-WhRBcQPWUmAKgbyO~WNTTcfcYJITlBnUORi9xgxwre7vZi2WaFR9HbkPWHpWjLRVNqxOHp66tZ6E0ULLfmFBPC1oX-ppZQtIekZuhrjDIVzWLSbDmkCBjUKbPNG55T1aYt3O7wyNuwZuU--VFc5AAL2DypBBauaVwADXzpmc69LF~2AGVGrZe1a3ygqLatwVmXfj32qER0OxjLki3MAIqN6m~8FYNwTM9vLDSwctOcWx9Tj6GuJrt51j6M5QiZ1V8K6hlCgKyPG~Ah6gSEgf837K9lFFa4qT6-etYbNaadKLIXo3lCqXwg__"
          />
          <img
            alt="bg-image"
            style={{
              width: '262.6940658074089px',
              height: '146.01695503157293px',
              position: 'absolute',
              top: '136px',
              left: '1257.92px',
              transform: 'rotate(23.8deg)',
            }}
            src="https://s3-alpha-sig.figma.com/img/c2e5/0b36/60e9ac30e76a99d83016ab6b4d3adc86?Expires=1745193600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=TtQ9~ixxlT21jSl9K8z8ATcq8Rd5oKlTMvTciSTSZHG5I1phzhdAfputeZAZwKun3Nq2vcynSCFsL6rQ1yIF7VfNQ41kEpRNzBDCyAHLyvzDL9cA5EVp6U~Zgfz6m-EN0znri36SdZGpfAsrXooiyYy3N9-A8lnp1C5Nz8udRxjGv13~pnS~Ny9Wm9kfeePFIQq~tX4MTGwPJaTUogMuKKaASG2XQb4-SFr9~c07vx2UvAhkDZdaKTQBKpIQ8mYTxe7nBjgVn~yyiVfgAthG3J75~zhpbA6HjQbDfXO3odkGUr~3zjcfM9~EtB8WkmA6Wbw0x4x5Qs2jd8o6~CikMA__"
          />
          <img
            alt="bg-img"
            style={{
              width: '231.9895822459228px',
              height: '309.54038009147104px',
              position: 'absolute',
              top: '-188px',
              left: '924.9px',
              transform: 'rotate(23.8deg)',
            }}
            src="https://s3-alpha-sig.figma.com/img/a2e1/3573/5d6af1e4c05cc1a0396e010d6dc30c3f?Expires=1745193600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=oukbHQB4SVWuATngZe0Z-qurNmMJvEhkXkuWg1J4ODE-hXubzktUrky7ekyzYTH2M2iB5IEdCmVqSdS8Vd7ybZis1XdEla6taNL9JIwc9sGB1h-LFLvTQtNJMm67xHGj3FHkBEbIJbvIx1BrrTiD53zOkIT7pNEW~~-~fYjinABJcT~zxrNXRC1kKLJfVkrQiuZ2HDbYseYod8LGXTaty97JIqjIV1jwhzmdMmweF32nDycrs7LrPRWJI9yFVdXnNzgZQMT73pliP8fR-6Lh7wnkynMp-A-slultn3JhOpF5WymNucu2q0uOIbahibxY4yjEYDojiymsrsPE22M-Hg__"
          />
          <img
            alt="img-bg"
            style={{
              width: '211.5310552819468px',
              height: '294.3807118614107px',
              position: 'absolute',
              left: '1127.66px',
              top: '-84.08px',
              transform: 'rotate(23.8deg)',
            }}
            src="https://s3-alpha-sig.figma.com/img/7318/cdda/1873372642b173123f29c0a059ac4977?Expires=1745193600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=fwvkUTM5leLJAIOryxXwUuE9ZL4pWUviVJ7RXqJMT7MDHEcMIQl53sTd0BRsxa9dpWO~ZdCOM3ek7zHONJqqhFou13onNZ68kz3Ky-x~Ejb83CYsmsaNXaRpXQJFuMaVDLBgSTnfpIr-mSn5HTV0kNF3BLhE8cPBB7xdhjoq6POUfgyyQTuYGNHp41d4MAjlvI02cpGrgA2LV9SdzeOSIxeUzNrSsSVQiaxEKsInWLH82iY72RXzZN6N3owCkG4-Dj2uzd3meLyhqwBdMz6~WOvmpaPXn72PsXDIUgZcmfFhbr4sDtxpXqZfm09PxU-oFLKh5qr5~DxIvxix9u-alQ__"
          />
          <img
            alt="bg-image"
            style={{
              width: '238.40121870898056px',
              height: '337.36023530733576px',
              position: 'absolute', // Necessary for top and left to work
              top: '-170px',
              left: '1388px',
              transform: 'rotate(23.8deg)', // Corrected 'angle' to 'transform'
            }}
            src="https://s3-alpha-sig.figma.com/img/3535/ef54/aa346c23b9548626f0fd394427b571df?Expires=1745193600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=O2e6WJ91BNLSec2ZTfm4UERbMtqjiEHgwAGpsSfSfxA-FLiIL~mwrUTpw4f9aJd~WJob7bjNHlHjs8fEAdun5PTzbYo0tI7uFhRrNrdFgNIPaEuyj~2UqXpNPOhD51KSWpEeL6n-q5GvowjtjbLgf1qIA8XTp7ohhH5HAf3-pi51pkHdpEoQK46hrtdDOkN164O76Kbft81fOrHwqXH9c7-5j2jH3dc1qpZys~wbJtXWhk5ldfdxwOPC89we0TORpB7464hnDNr5cqwTzRcQY2BBb7cBCG9BN6PO675TYz2C0YAOBauYg3t6RDiVNnTZII-lWy5sbzcBUAsuNOS7jA__"
          />
          <img
            alt="bg-image"
            style={{
              width: '351.83439897950566px',
              height: '351.83439897950566px',
              position: 'absolute', // Necessary for top and left to work
              top: '-114.32px',
              left: '757.61px',
              transform: 'rotate(23.8deg)', // Corrected 'angle' to 'transform'
            }}
            src="https://s3-alpha-sig.figma.com/img/afc3/81fe/17e2b3a7542a00b92a8508895bedeb04?Expires=1745193600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=dRQ1~wFgU52ZNM~g5xH7G8zs6bVHuOOqtCHR0R2iam7465JwzEGCvqydiPcQDMGEK3iNaDK~x3JIMhVCCSJFHXLw6YPWlj5S~00bqrbH5Ukr3xTGOQMnAELSO~k8PMnw3tcMqsCVRCklcx7QSJygzh~khYD1k9hsNcLGf3kIXDHQCUfckrXV15QJab1Csur9Cyrz3vaeIJuH7s9~RzU6NAaOMtcvZeA18180KD4RIlhz-Sj1G27emogHOvWoiA-Ij74ce-o3vouV-FtqHTGN~JXtoWx63ec5cJWq7h4MXiJxvhRHOP4PsZn6~cO-L91pZrTC4n322ERDIZGYEcm-oQ__"
          />
          <img
            alt="bg-image"
            style={{
              width: '108.28954501846479px',
              height: '199.8835941436771px',
              position: 'absolute', // Necessary for top and left to work
              top: '-183px',
              left: '653.66px',
              transform: 'rotate(23.8deg)', // Corrected 'angle' to 'transform'
            }}
            src="https://s3-alpha-sig.figma.com/img/8650/4ca0/0066d18c173d8e7f637311eda8fcce61?Expires=1745193600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=VWVFM2BXIWgDas8zvNV-PqksdC2US46yw8uIVFZMrZpu7hcyauzYdyOFWAco4FX6sGgyQt~u4qpZUXCBALsPi1EJh9PUusIxQlWmTI~z11syIHz-iNG~JaOcFG36-Bs830pPulZTaVl08Rf7NPx1WzTlBIBvoSWMXUI--E2weeH6QBFzxpwCvwIsE~dpEqSAIgDRDeKa0HG1KUNo46TeL2RU2LsP34KHsMpXv9ZcclDZq45UGrCbfxlPZZQir3ePx6CXYZfF7n9GHhF6pP4QYv9UNstwm6aQfEPg5rMnj~jlsXe6FA0BJFxULNIqh5PjwBRqeeFsM4-FF1zppaFJFw__"
          />
          <img
            alt="bg-image"
            style={{
              width: '197.63640172212928px',
              height: '160.65016451232424px',
              position: 'absolute', // Necessary for top and left to work
              top: '901.96px',
              left: '494.99px',
              transform: 'rotate(23.8deg)', // Corrected 'angle' to 'transform'
            }}
            src="https://s3-alpha-sig.figma.com/img/6796/dfef/207c1e261a13bc7f152bfd85dcad287c?Expires=1745193600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=n2rtbo4dg2RRZyku1erS2GeGUA4bxnV35~0IzLCZm8RB7bL~O26at8yMzxCbBYZEHlr~os63VKTqAGb-0brsH4pqqA5j~sTew4iscVrhVG8Rxgi~kyJoLiyVPy2orq8AoM~~lNLWoCdhLC9h72Grv2t0p3ABJqQ7muWnky0ApnDcIINHiXUfHpUO~8Gv68WX6ln3Jde0EIV5so6kA7RQ7PX8QwbSy~UTjdUCv4Q06qApykEl~7lPAKchhZVDJXilw1VpHu-qCGb7G70CI6iApb8cEGUw0uMVNl~lEGVqbJfYAQQJgpHGk9TYS7zFjRmCsCpsv2Vh5wAlizqAonx9zw__"
          />
          <img
            alt="bg-image"
            style={{
              width: '424.89307373021995px',
              height: '199.86629067658197px',
              position: 'absolute', // Necessary for top and left to work
              top: '837px',
              left: '-144.35px',
              transform: 'rotate(23.8deg)', // Corrected 'angle' to 'transform'
            }}
            src="https://s3-alpha-sig.figma.com/img/fc07/ca96/b8f275bad4d96bab9200f364c12e40e1?Expires=1745193600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=YYxoXzWdKcUMX6xP79GjSTnrRcJ7g45MjH-ejK-AP7TUHbkgKKFe6-pnLKrvfJP~mM11~bF6uS9c4NVmozqtsUSfdV9WvVstrWh-CPXq6B3hm2GGcOa2h0kSqa0r8q7zjjHvlgqWg43Hrje8JHtRtGR8cCevl6uoPUo1zPQfXeeuEZLO1kEN6mZf7mabrp5ldKA1srqnrP5HxwE6yei1yHgZTilvAH~osE1as461z8dqh5Zvs6cizWjP-d2kdQpU2CeP8CtGXjxZd8apeWBJI4jKlisPNsZpfq8XZvPtqUiD-uZB4KaLcUMqTAriVwXB3AbdoxDGoNl7rZ-Q92fnMw__"
          />
          <img
            alt="bg-image"
            style={{
              width: '424.89307373021995px',
              height: '199.86629067658197px',
              position: 'absolute', // Necessary for top and left to work
              top: '984.15px',
              left: '676.01px',
              transform: 'rotate(-23.8deg)', // Corrected 'angle' to 'transform'
            }}
            src="https://s3-alpha-sig.figma.com/img/fc07/ca96/b8f275bad4d96bab9200f364c12e40e1?Expires=1745193600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=YYxoXzWdKcUMX6xP79GjSTnrRcJ7g45MjH-ejK-AP7TUHbkgKKFe6-pnLKrvfJP~mM11~bF6uS9c4NVmozqtsUSfdV9WvVstrWh-CPXq6B3hm2GGcOa2h0kSqa0r8q7zjjHvlgqWg43Hrje8JHtRtGR8cCevl6uoPUo1zPQfXeeuEZLO1kEN6mZf7mabrp5ldKA1srqnrP5HxwE6yei1yHgZTilvAH~osE1as461z8dqh5Zvs6cizWjP-d2kdQpU2CeP8CtGXjxZd8apeWBJI4jKlisPNsZpfq8XZvPtqUiD-uZB4KaLcUMqTAriVwXB3AbdoxDGoNl7rZ-Q92fnMw__"
          />
          <img
            alt="bg-image"
            style={{
              width: '186.94510209936456px',
              height: '261.7231490426261px',
              position: 'absolute', // Necessary for top and left to work
              top: '827.01px',
              left: '323.84px',
              transform: 'rotate(23.8deg)', // Corrected 'angle' to 'transform'
            }}
            src="https://s3-alpha-sig.figma.com/img/7fa0/4b1f/8a6b7ae052e4641aab0738eb9af64738?Expires=1745193600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=T6J6JINMlK8N9FsE46-GJyVjdM3lc~r29ygLLZ0iz~01gpgP94YQ2x9zdlwG5gLY4~dQMEY-y~UTye7QyJsJ7cETImixhbdJ5p2Q8d~QSc8BYsTKPePTWOiXwzvsNl0pbVoicRHUc5KJ5VcZFL1dQIfkbVS7BbELBKQdGuWa~aaBCnlI5MCMPlOGK3jaQCwRWoi36HFS0SuQChBKhvZ4y2m6PNcBFN-mJteXowfG2mr2E2YqfzwKSm~8X42NilF2HESa2iUyMFN3HMMD7tBa4CT92U4Ia4IOH1R4zCgR0U9d3Ty1czEVu2lnhixqAiHM4f9lDCEY9ZHVX-R9-e5IfA__"
          />
          <img
            alt="bg-image"
            style={{
              width: '186.94510209936456px',
              height: '261.7231490426261px',
              position: 'absolute', // Necessary for top and left to work
              top: '827.01px',
              left: '323.84px',
              transform: 'rotate(23.8deg)', // Corrected 'angle' to 'transform'
            }}
            src="https://s3-alpha-sig.figma.com/img/7fa0/4b1f/8a6b7ae052e4641aab0738eb9af64738?Expires=1745193600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=T6J6JINMlK8N9FsE46-GJyVjdM3lc~r29ygLLZ0iz~01gpgP94YQ2x9zdlwG5gLY4~dQMEY-y~UTye7QyJsJ7cETImixhbdJ5p2Q8d~QSc8BYsTKPePTWOiXwzvsNl0pbVoicRHUc5KJ5VcZFL1dQIfkbVS7BbELBKQdGuWa~aaBCnlI5MCMPlOGK3jaQCwRWoi36HFS0SuQChBKhvZ4y2m6PNcBFN-mJteXowfG2mr2E2YqfzwKSm~8X42NilF2HESa2iUyMFN3HMMD7tBa4CT92U4Ia4IOH1R4zCgR0U9d3Ty1czEVu2lnhixqAiHM4f9lDCEY9ZHVX-R9-e5IfA__"
          />
          <img
            alt="bg-image"
            style={{
              width: '351.8966125110273px',
              height: '197.94186742563684px',
              position: 'absolute', // Necessary for top and left to work
              top: '682.99px',
              left: '30.97px',
              transform: 'rotate(23.8deg)', // Angle converted to positive
            }}
            src="https://s3-alpha-sig.figma.com/img/d033/c33c/6435b2f525aef2a8f435bf77188133b2?Expires=1745193600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=Rv99~WWke-OiXL0e4R5w1B0KIJW8WwoJrbfUnUaL0T5oXPvKSK2CItWA86NWwpxWfM5Wl6gYxrML34IJOdq-UX3zorOlN2k0fJeOULDm01htBf7AHkJPfEMCUGFMADR6gmZXCDG-Vuhe30rymGMqsBn~OCE0YjfdfSniQvnXAOCF5P5mDUoreqbZEi4gAlqXIryXV7TKvLh6PDLxZ28GDFzLtdrblC5IAcHw30gSp6Z8mvXF2C5X30-tOE092ocGlNLUGCl11CKJN4VblbnSZ8PkleiK1v6SmvyP~KzpxvfGnxj6Y9pQfth66Rqsl4jVpB4~O84DgxcjpYbeCfiptg__"
          />
          <img
            alt="bg-image"
            style={{
              width: '147.45550791281488px',
              height: '230.5258828798724px',
              position: 'absolute', // Necessary for top and left to work
              top: '478.25px',
              left: '97.07px',
              transform: 'rotate(23.8deg)', // Angle converted to positive
            }}
            src="https://s3-alpha-sig.figma.com/img/8650/4ca0/0066d18c173d8e7f637311eda8fcce61?Expires=1745193600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=VWVFM2BXIWgDas8zvNV-PqksdC2US46yw8uIVFZMrZpu7hcyauzYdyOFWAco4FX6sGgyQt~u4qpZUXCBALsPi1EJh9PUusIxQlWmTI~z11syIHz-iNG~JaOcFG36-Bs830pPulZTaVl08Rf7NPx1WzTlBIBvoSWMXUI--E2weeH6QBFzxpwCvwIsE~dpEqSAIgDRDeKa0HG1KUNo46TeL2RU2LsP34KHsMpXv9ZcclDZq45UGrCbfxlPZZQir3ePx6CXYZfF7n9GHhF6pP4QYv9UNstwm6aQfEPg5rMnj~jlsXe6FA0BJFxULNIqh5PjwBRqeeFsM4-FF1zppaFJFw__"
          />
          <img
            alt="bg-image"
            style={{
              width: '346.94510209936456px',
              height: '346.94510209936456px',
              position: 'absolute', // Necessary for top and left to work
              top: '471.81px',
              left: '-80.4px',
              transform: 'rotate(23.8deg)', // Angle converted to positive
            }}
            src="https://s3-alpha-sig.figma.com/img/afc3/81fe/17e2b3a7542a00b92a8508895bedeb04?Expires=1745193600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=dRQ1~wFgU52ZNM~g5xH7G8zs6bVHuOOqtCHR0R2iam7465JwzEGCvqydiPcQDMGEK3iNaDK~x3JIMhVCCSJFHXLw6YPWlj5S~00bqrbH5Ukr3xTGOQMnAELSO~k8PMnw3tcMqsCVRCklcx7QSJygzh~khYD1k9hsNcLGf3kIXDHQCUfckrXV15QJab1Csur9Cyrz3vaeIJuH7s9~RzU6NAaOMtcvZeA18180KD4RIlhz-Sj1G27emogHOvWoiA-Ij74ce-o3vouV-FtqHTGN~JXtoWx63ec5cJWq7h4MXiJxvhRHOP4PsZn6~cO-L91pZrTC4n322ERDIZGYEcm-oQ__"
          />
          <img
            alt="bg-image"
            style={{
              width: '170.44993885116685px',
              height: '265.022129812382px',
              position: 'absolute', // Necessary for top and left to work
              top: '351.78px',
              left: '127.61px',
              transform: 'rotate(23.8deg)', // Angle converted to positive
            }}
            src="https://s3-alpha-sig.figma.com/img/de00/32f0/d4e14279ac5866b63cf381c3e9ae23f1?Expires=1745193600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=gR6yowf1l14bSrD1g1RpDA8OWRA9D6MBUvgP1MPfFQOsqeLaHmsysDMANT0foAiCgeUOwZaw8JrWGybaFJczwauQ4Gw3~vcPr3vY~LyvuZ9Fx1aOIKqa8vX4H1z-5KVTbHqS2lpkGYTOr6AZybTckKfjsp~mSxYmq6AJeTOLhF7K-tONha5h333gkEvRSIicL4eZWChVFvDO3SpIn97HeOKPKnLOSSKH8dFc8jgji3LLtXzAGZRNEieVnzn6Gs5l~7jQyx59GGA3Qe03ikqaiE3gtKaPPYf8vzAkHe7BKgqW~YcuG0ffojzxNybD8YBUWu4vJ5AlgkUCMDLGRShA5Q__"
          />
          <img
            alt="bg-image"
            style={{
              width: '229.00774015350854px',
              height: '320.6642816504035px',
              position: 'absolute', // Necessary for top and left to work
              top: '455.54px',
              left: '783.55px',
              transform: 'rotate(23.8deg)', // Angle converted to positive
            }}
            src="https://s3-alpha-sig.figma.com/img/d6af/22a1/e716aab4c1d569fe911f870315a9bc86?Expires=1745193600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=js1cy2CUc6yiF2W3LWh5smfPdOSunqq8KcxMBHKq-indrbozjeK34aS3A7VD6nNeFvlKUM~D7V0ce~~ExoA9fnDEL6ffrI5M-pfxtFR3MOHS-flXoDpkel6TfZveLA34fdMyKOMqHXkoAWxganz2fe2hz5ox7ie-9PAICH2KFee8A5iEx~rUDkzIpGzzmlYqD6CbDY2efKPHq6~F3MciO0BBm8fUo7bHvuKMN87OF0FNVBnFgXsjlO5ZgbqqYgstu35e7nY6LztqkSjmXVEkWtt3Y4UZVZJTch8fFOrBAHjYJR1RMrEODN-uoK~Nut7UnWijbnAwOzYf~1iq3z7rCw__"
          />
          <img
            alt="bg-image"
            style={{
              width: '164.9515409292414px',
              height: '231.75691622628727px',
              position: 'absolute', // Necessary for top and left to work
              top: '861.29px',
              left: '954.54px',
              transform: 'rotate(23.8deg)', // Angle converted to positive
            }}
            src="https://s3-alpha-sig.figma.com/img/5515/a227/96c46d98cc00e29709bf7fa6ced30c78?Expires=1745193600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=uUklXvacmaLk29Q3FitXxvWNolqeVw20Ig4Fy-ygQ0wXn5ZPTMHXOxnWBU8D9uGqaNAYDJdMEway1~wYp0UeKO5eHSeH-Pqlht74s-fFgXTkJp2AYSIFPhcM3tdfNJJCG0fxGY6CteLU80alGV6owpL-Z7kXUrg7jjwaOJZaXARavfyXjaaNj~CAb5dTklUpRLHCJuoFbqqd8GwczNLdxvv62wlJQa6V97wEeWBjz6XXIhsKvmkoUcf7DAD7CHqpORTEd1GjHVaopAP7UDWwJoF7JSRFy0ykN43gRcLpu7qMmh3cjWmv9c13G3sDVE3Rg4fUAypq-8nsUnFe3m6hwA__"
          />
          <img
            alt="bg-image"
            style={{
              width: '163.63305946120195px',
              height: '231.75691622628727px',
              position: 'absolute', // Necessary for top and left to work
              top: '795.29px',
              left: '804.87px',
              transform: 'rotate(23.8deg)', // Angle converted to positive
            }}
            src="https://s3-alpha-sig.figma.com/img/4852/b423/fe92869ca32a6686610acd73495e28f5?Expires=1745193600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=gfDvcqhpSe4eVH5R3rSM5J08~weH7OOUWG0fBA43sYiwDw6A41r0ciRT6qkpVAuiIyhE6Kzqxa-tUsZAqM~4nGYaGnCevBAVJlM~4b465Eo6awnoYu8PJRQHjXk~5ipomqASJqZaiAavdEyEzNeLnqI~-EA9ByKMXXo3IXTYb8qhKI1x2dmDxI~XNX6HCjoyjG3AB7~wRwFuKRor1QGrAErVGHFm9i27WXY6RqvCEefMQDDbFvdZ4MP2K6Z07cPMQRGJx7RwoqJvtgtazG68ZNabgB4YEurT1Qzpx5bJCVz2qdQhCaVj-gaI5BlDpxq2Bu~h9aGxJDniVMsaVAr6SA__"
          />
          <img
            alt="bg-image"
            style={{
              width: '164.68736550964866px',
              height: '230.38234344868724px',
              position: 'absolute', // Necessary for top and left to work
              top: '728.84px',
              left: '658.2px',
              transform: 'rotate(23.8deg)', // Angle converted to positive
            }}
            src="https://s3-alpha-sig.figma.com/img/10ea/8d4e/c2eeccec25a532df1aa461cbb3f5fae0?Expires=1745193600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=t1~SdEBP6FkDuA7tJw86k9JFh780LhG36Nt-FS0v2j-Pa~fWeU~vwH-hEGE0rXevt82UQYEPwgPfBPJJSzN2RfjKHIzrR70FSLU2ahalRxmROaHyKrUAc3wRwz8eVf9wHfRI6yTt3QN7JT4VvbBd73BNOXurADVxVq00YZIgl208RYj1~NRRqfJzAesrpBRbHxFFY5dxTj4pgtJ5qwBOf3MyGspfXKkBguufQTw6khnWLyyRZ8plPBpULTDI5oSFWyPGl0KdE4zCpBpAULyFYj0hEIFzmZiYTzkvTf-hQqJZNJ2twolUarhgC-WNgZZ5qsshXGRZ-Fku9ik9WdGSLg__"
          />

          <img
            alt="bg-image"
            style={{
              width: '214.2589300848271px',
              height: '317.5317132370318px',
              position: 'absolute', // Necessary for top and left to work
              top: '578.54px',
              left: '519.38px',
              transform: 'rotate(23.8deg)', // Angle converted to positive
            }}
            src="https://s3-alpha-sig.figma.com/img/98b1/b14d/d37b79257f4fa9d44b0dc659a12ed2d0?Expires=1745193600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=l~NWBcBJNhwTaT~xlx6Y2WhcJmYeMpHd9ZtN-leLLrDdEGJN~jyDqou~eS0hZDCtwKsRr258ou3eRdV~pqOBmCX3D2xO-upjBFNzuwnmKgExKg2TsxsiwYjXi~YtcnPnXH9lRduHBSNp8G0Kx3Ghm-xq7jvonP3Tg4mAo~a4ZB7kPpwUS1SqVUar5zfD0YQw55kljIuQ6tCh0MJbsuAZJiSqOc4EAUlPNItWHU9bHxgqNXY-MHNapH6S75W7~jWGzzeXi-UvaA7jf22GPJSac8J71kIkKdlI4-r3tiEhx3~Ips7tToY3BAe0Xjz2ufRicblSJGNkqXcX2N3sFObbkw__"
          />
          <img
            alt="bg-image"
            style={{
              width: '308.99548872465675px',
              height: '145.98211921554278px',
              position: 'absolute', // Necessary for top and left to work
              top: '640.03px',
              left: '205.04px',
              transform: 'rotate(23.8deg)', // Angle converted to positive
            }}
            src="https://s3-alpha-sig.figma.com/img/7b24/9400/0e5e83f9d44a776304cd0dc6d97ba4b8?Expires=1745193600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=YMRQOvqSzvSI2ksDGTt~e7yh8j-oqm40bGSGJX86zIYlhkFz3Sdy1y0cxhnWoN-i4VWW4CciR6oYHbOTBCaurZBaPCBHUrsDdr3yessEuKWLQxR36ImOtNSJ80laojjPbpXqo39cshg0dj9kUvU2qOzmFxZzDWqMv36qtUiUCqvRcie-qR-0Alsr7DgteEPsMZ2-A495E0u1wk82zmdA92nSDWF8v01vx0D5l5mOpzKyVBFKyAU5L610ia72HAgNFKtp69XrolxnJLKSVuZnlmVjaUWKnMF6Nj8ThzKCi~Do-g9~goR9d~NyT4w4wpbI~MMvjE8IuzgbuqdQ-q7jfA__"
          />
          <img
            alt="bg-image"
            style={{
              width: '198.49170264019259px',
              height: '281.517308319369px',
              position: 'absolute', // Necessary for top and left to work
              top: '710.08px',
              left: '1190.23px',
              transform: 'rotate(23.8deg)', // Angle converted to positive
            }}
            src="https://s3-alpha-sig.figma.com/img/0441/b5b2/78a61bb23fde72dc5f9a9c4ccc74cdd8?Expires=1745193600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=ceSRHVyUyByGaGRKGuAJBiloJleB4RshXccWQVfQLUvMnAjo7VuaEIIPXDEZdALb6Un~hKtMmnILXvBWnj8mFUpkDFoyCnhTa0FPKF0f4djvOEhtF5i589rasZGKUeuwnFHLOw4fD3xnxeu9PD2IW-CK7qqVZKKUYhq-3IA2LZG3cYqXi5PYCaphnWdd9OtyQwrf-hr4jxdOEismw8rIbHFCupOrEtOBlP8vB16EQRg1~t338uRH6uH3NPRalYmExlSJEN4OBBeesqJf-gzjvqb3Ac8h58iqFrhisCkQOs3l8hpSN8EV95CP4GxP9IB8GgTCzMuKCp0lWldv9Q0iXw__"
          />
          <img
            alt="bg-image"
            style={{
              width: '335.6058085045455px',
              height: '429.9030818584828px',
              position: 'absolute', // Necessary for top and left to work
              top: '700.18px',
              left: '1360.85px',
              transform: 'rotate(23.8deg)', // Angle converted to positive
            }}
            src="https://s3-alpha-sig.figma.com/img/0c5b/00db/9944a99ca3a3f502591a9b7891862d82?Expires=1745193600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=n0HYurLkpiCEGXiEuNzCECtmtdptWycEj4q7bEwBesjT490aF2u~WE0CEmNEQ82MxygMJ9wbMjIL7iC4B2~f21eBpIo9IyZtegxYzxNcX2aF4kwgUU2zaM9KS2eNgUECccWWBTAt4jNGneBewFTpo7vwXpX2iNMBw5LRmSW0TJt0CZ~gRKY52ZmqTONXikxz7dUPpoxi4yWwnFydy8A9fzie9kY3xsM61rfEGoZN1j3JJorA3hlAuO1MT8GAQr9deH0J4vASr-ZPx48hkVCgWmJx4gEoB44TCiVnQkgmZ-paABxw38scUqiMCq9EMrqofDOpZq4tKi8tNK8~HxfXaA__"
          />
          <img
            alt="bg-image"
            style={{
              width: '304.97708655578134px',
              height: '171.54962453906765px',
              position: 'absolute', // Necessary for top and left to work jathiratnal
              top: '485.06px',
              left: '265.26px',
              transform: 'rotate(23.8deg)', // Angle converted to positive
            }}
            src="https://s3-alpha-sig.figma.com/img/81c7/a345/dc1ed81425ab510fd943c75e3a4ddbc2?Expires=1745193600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=skEU0NWJhKB82DcTconVyGDyw2USkp7~Vv46cQtHEu9lKycggdSKlGZM3kYLupWEqXDkFs0Mu3bmq1EOoSVUln7R1dpckHg10gCRWOpwOwy2H6JfztkXUPWIZfogOBU3RH56~dghUHYldxYGuvQz5aD3vQPiAq9b-lIKmLVnHUzmkHcriXrYxmM1QlBJrVOaAdIhesBAOIi0wkbWV8LRAwoI8-TEL8pUMhcjqx3VCWebsF5N74X1Iv5SeEdVrmb9c910nqN-z1zqsDxQlDcIU6rS9zkyY4frAW62esKKvSgW26ehZbnwrWjzBt3xI2cX07lD8JPdz5uLRtr85jLmnA__"
          />

          <img
            alt="bg-image"
            style={{
              width: '179.33360599648395px',
              height: '265.57199554451637px',
              position: 'absolute', // Necessary for top and left to work hassin
              top: '265.29px',
              left: '-13.33px',
              transform: 'rotate(23.8deg)', // Angle converted to positive
            }}
            src="https://s3-alpha-sig.figma.com/img/e9b7/75a8/7517aa79c36345a05df1c1fbd968e594?Expires=1745193600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=bVaahlHKcjqfKBG6Joyb9jSQOkMl67mic36EJHLNF5mNSFI-tQex9t2G4bVfjZINNBYApo~vLeA3wZ6hl2CSM84ttw5ETo~8xjuD3RV-n0GHS4hhrpAwOA3OEww6HuXcsIotKpn3ucNOBFt8TNGdJ0JECGZA~VOSImMgvxTdrvQ8mfO33IaN~QRhYDkCTl12losgtYBpHsGlDb4ghdn582TlAILX5RHgYqgMb5xct1zLNkwssFHWQPv29jeQpT9DsDT-WqQ14jn-UX6yAm32qxf2ZeZ16RZ2hLn4q0lmftxdWKVQRvSF9OTY33I5aGoVBfY0jtkCWLTR7LWTu526Pw__"
          />
          <img
            alt="bg-image"
            style={{
              width: '281.0401045972586px',
              height: '174.77954368359207px',
              position: 'absolute', // Necessary for top and left to work
              top: '679.74px',
              left: '926.44px',
              transform: 'rotate(23.8deg)', // Angle converted to positive Happy New Year
            }}
            src="https://s3-alpha-sig.figma.com/img/9773/6d80/cd9e00092f3bd408256c79cc93dd5549?Expires=1745193600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=PTwIa3iuTp2nP2h1lbNUzGmyBLBwNRbxa2UmkVXX6-MVBca6QHI96WcLnWGCYzlTJEfm14v1aXCvyoUfbJ8F-QXZGh58LDLJrqPl2y2rygvqrHTJZ2duVDlgIO4pj~P6ODZwSb9bhw6pBVGgj5nhHDxb9~sbFZk3gIl2lnYiG13Evo8SPsJaMIrmgcIDgtMUSuVnf1~vWkWRyzFqv96juYtq~8axcG2vvadbq-IGz48BLVKtQ7sagynAZBZDsW7PYY6xfp9-IRlghBCu0xqEb~5mVSM01Z3sc0V1lj~9Swm0YnzYWTi1otG5YwnigSOimklv~kqd8mjR-4SSosj2Iw__"
          />
          <img
            alt="bg-image"
            style={{
              width: '149.48733778182233px',
              height: '233.68135473602172px',
              position: 'absolute', // Necessary for top and left to work
              top: '456.05px',
              left: '1236.8px',
              transform: 'rotate(23.8deg)', // Angle converted to positive
            }}
            src="https://s3-alpha-sig.figma.com/img/80a6/128c/2a21ea895c92ac1c331749d9477a1b61?Expires=1745193600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=jT10sKxstfQa-ah4morHHgQL-T3I20XzqcR3a7i9jJxQetiEbYwK1ighQF2njgMLpcRI99NUcnDCgQJMol9ub2QBSCtNwWKmRnQCI1B3B6zWdrdQsbwiJzhUuk~fh8IU03VaUtlM8aQnb6r-bi5NYzVm7TYNLFdztL0ussnM82fh7cTdy5EByM0rNoH9EJU66IQHxGRl3xdcZgKH4VjWzON2nRx1nWbJ3mCdmKPD8BpQCWwA9UKFkFDpAah61RK56HkHfz8HKKsMP0YR8xwJoNYZVWLwveZtBnhP~jK2IQcUVnJ4N6luP13-Aw4wkvBOs3RpxAGAYTa8FZMlLIPuRg__"
          />
          <img
            alt="bg-image"
            style={{
              width: '211.68782408347718px',
              height: '368.66672388408153px',
              position: 'absolute', // Necessary for top and left to work
              top: '-85.34px',
              left: '105.25px',
              transform: 'rotate(23.8deg)', // Angle converted to positive
            }}
            src="https://s3-alpha-sig.figma.com/img/dc06/f701/8ec7492b8c3287866bc9285b6f579371?Expires=1745193600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=iHh7~c56NmDIRNUFug8ESBUY5CySYirWd8vdwFwt3m~~yOyH0nPgYktq76bRURAb7gfCgdnoLo3h2QGdNvfHF~w7ryg1l2KPVBpop-icv4BKcTzfpHw6VhRyiRRVKJ8iJ06o65W0f35wJUtXx18yXy7E2qL1z7ubtZn8OqT6jNHmVqVlQqdLFTqqUfo~6vqrOqGFxtejfwiNO4k1bwUM5KMH1nHLRtDRoMK4grZJWhKqT1V4XvKGbDypf9GaUMCIzde1Vd3L51rgw6vnuWgMDhTa-VXNhgyUWbtKj2dGb-eT0cjCQE1sfqMw~A2dXA8zn~qZzQdSp6mk8BVjbcGc7g__"
          />
          <img
            alt="bg-image"
            style={{
              width: '163.30203528557414px',
              height: '241.49327503669303px',
              position: 'absolute', // Necessary for top and left to work
              top: '510.23px',
              left: '1359.65px',
              transform: 'rotate(23.8deg)', // Angle converted to positive
            }}
            src="https://s3-alpha-sig.figma.com/img/e4ec/bc36/130d0eda7d376277e43db977ff7da2c8?Expires=1745193600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=XTG2flsk~6CQyhkkOZqYd7woD1E53yIFemSUjKG4qLvyLqgAkHXKwz8kwGkq1wXgO3DRR7B0Euw092Az111biXFpDlX0eudzjyAxrmK7I42ojuM9kt9Us2PM2Zu5hwAmlhaRl1kEdvtm7~Itv~82xYbo8bV1TyhWt6~U7JlwnRO0VmHcxZPmp2xkIUwVuK142MWXu18utHo6pzu9wrjAqhhBA7kZXo-36q3QlhQkA2vTYIHOgCWxvQauEio8lcMp~5Cn2evY982DV-Ei1TizcLxUSp5vpVWLRVLs4meZyxET75d3hyaJ4zZTWum1qGq43xy~BtqJywytGHJUy3LyHA__"
          />
          <img
            alt="bg-image"
            style={{
              width: '644.1358143257587px',
              height: '263.92248990084914px',
              position: 'absolute', // Necessary for top and left to work
              top: '267.79px',
              left: '229.38px',
              transform: 'rotate(23.8deg)', // Angle converted to positive
            }}
            src="https://s3-alpha-sig.figma.com/img/3f5d/a29f/0066c7b9461f4cd8b3ac358eced4b0d1?Expires=1745193600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=U~aa4NiWFXfy2FBbURfyNgQ02UhlfroDQ6rdf2Ay2Dv3JDYRC55uDkkI0XE0f1CqkPK~OwMQcZqDV7uiQx1RJ3ca59~2GoYWoxk-lqMBYwX0NYQpXxqq1MQD1N6OAcFvY8~SjVEeOTMkT4nEWHhIFjF-TZxkgANc~Sb5OiwcdLJXTEpV9RvfWkw2p22U8KV1lG1d1tmQZ-qmgqvTSXRwc~U0adpocX8q0nZOiFXjmSy5qJR8zu8PA2IPSPYDJ9g8EJ8PlUW~xA-oLFDYSni2F33HlITSnsyolSo3kQzzpfVkp8gm0dUAuPqdGzxO7a2cYelaNJUYptzWT8935XwvyQ__"
          />
          <img
            alt="bg-image"
            style={{
              width: '174.98556820180937px',
              height: '259.6253096509965px',
              position: 'absolute', // Necessary for top and left to work
              top: '487.15px',
              left: '1124.05px',
              transform: 'rotate(23.8deg)', // Angle converted to positive
            }}
            src="https://s3-alpha-sig.figma.com/img/f904/420a/4d960e86578f2e66adcb5fdc7e9a6afb?Expires=1745193600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=qbq4u50FiReYl~kYYGiXrSkjSZc4UeW9c50N3Q6PGH6o63-pRcwCDfKom~CBBlNkB-YCe~ku68lgQOxajWJ8TmOFWf6AgCtYK5hvYAMqZfuJxeoqFSkcKygIpyt4xNO5-5d6wxug8kOtpqKRvIwl2MCegfLsRalPw7efJB5qH~tShCAfzPI62aBXvnH6~n3iTBg7bnF7LdQzpHoEiQRDERtfJobbfmAH59a9a5CKeErpJmCOotlQCKxKc6JBz-LUF37TVcWkHUSElIBkIsz7o9uXY2g~4hqinOKpqyiHpn-YDxxGKugynDMLYUhOjbrt5ccwMGta7R5kYL-U-FKQCw__"
          />
          <img
            alt="bg-image"
            style={{
              width: '240.27940782826937px',
              height: '300.34927885882337px',
              position: 'absolute', // Necessary for top and left to work lovestory
              top: '310.66px',
              left: '576.01px',
              transform: 'rotate(23.8deg)', // Angle converted to positive
            }}
            src="https://s3-alpha-sig.figma.com/img/e3a3/8992/aa969996cf924791d666939e8cff2597?Expires=1745193600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=TGNEbHQVlFwJkn8GvdrCIlmcJ31yeIV8cxqQdSlFve32kNJRojCzEVJB0gG5IiuCXCkKwTLiJ3R-HmT5bLpsGknLh0~xd5bB8UusKXzyrGL0myrE4e2QzDIbLLzKEuiVA3RfTnWdQI3ArXtm6e2pfCEAXEgvIdj5BsZCXqp3TFdw4UPFZamimCJMsBN6fIeF4SDG6vTGw7tw~sh4~BdgOHppHQexMMriMLvDxIB2~W7Wq7NlKn3ycBbbcu4JSC4Nz0SxnXdaMK02Z1uM1XTiaQhBDjqx3FyLM2fAcaCq9p0gkdVm-Q0K6BbpFigDqTJkB99WBu7m6h54nUMLPUSXMg__"
          />
          <img
            alt="bg-image"
            style={{
              width: '105.43203154147486px',
              height: '156.4290493272593px',
              position: 'absolute', // Necessary for top and left to work
              top: '530.61px',
              left: '1010.3px',
              transform: 'rotate(23.8deg)', // Angle converted to positive
            }}
            src="https://s3-alpha-sig.figma.com/img/67cf/d96f/6c1e5b29d51fd2937b932bfefecb9513?Expires=1745193600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=i3w0QU2xk-DZUGE4pFFgr~2sul4BDObuYtDOuUqpFidSLD0nS7EU6WGuRgiehSungYCaj7xL9iJOd1f9XZLYzCgqibRMwZKs9sBkm9msCuydq9-1bP5Js2zruSiu7M~D~qTMb-hH1h-LVZZRG6atbBWZjK868mi0myXMo3n34mp9c6PUHuIy0tcqMH-DJv4RbslqZWAvY0hX~R11ENyt-36enDVDQERqPMkoDQtfpRRdm7hGx0tVrDBoJL4SbrrqdSY8pZAPeFbqp1z1zSeqDq7i44UmVPITC8wLZZB2hriZRauQuah9RtkwDW0YJfGaMq7Yt0mxGpt9JDKSiD425A__"
          />
          <img
            alt="bg-image"
            style={{
              width: '192.4434847625007px',
              height: '156.4290493272593px',
              position: 'absolute', // Necessary for top and left to work
              top: '413.47px',
              left: '1527.92px',
              transform: 'rotate(23.8deg)', // Angle converted to positive
            }}
            src="https://s3-alpha-sig.figma.com/img/6796/dfef/207c1e261a13bc7f152bfd85dcad287c?Expires=1745193600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=n2rtbo4dg2RRZyku1erS2GeGUA4bxnV35~0IzLCZm8RB7bL~O26at8yMzxCbBYZEHlr~os63VKTqAGb-0brsH4pqqA5j~sTew4iscVrhVG8Rxgi~kyJoLiyVPy2orq8AoM~~lNLWoCdhLC9h72Grv2t0p3ABJqQ7muWnky0ApnDcIINHiXUfHpUO~8Gv68WX6ln3Jde0EIV5so6kA7RQ7PX8QwbSy~UTjdUCv4Q06qApykEl~7lPAKchhZVDJXilw1VpHu-qCGb7G70CI6iApb8cEGUw0uMVNl~lEGVqbJfYAQQJgpHGk9TYS7zFjRmCsCpsv2Vh5wAlizqAonx9zw__"
          />
          <img
            alt="bg-image"
            style={{
              width: '234.4934580215045px',
              height: '156.4290493272593px',
              position: 'absolute', // Necessary for top and left to work
              top: '328.84px',
              left: '1313.35px',
              transform: 'rotate(23.8deg)', // Angle converted to positive
            }}
            src="https://s3-alpha-sig.figma.com/img/6c53/88db/f6b32d08199904a4b361c6e120f40f85?Expires=1745193600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=NO6D2XdAI81u9v~DbLdTZOeUnfyQc0qjBJPgf06Q7wt9kKnOO-yJB09FGOMjzWgO9J67TFmD7e5F8dhXQ5OwDp9zFgXZf69FNlK1pcCIA~AMosJKx1QfnfnXzDL3z23BOP7H~teVfxXOkZ3PZa5PIOKusY4hdJSMsozz4zVtdvcXGQsYbe-1OAHC~GVIe8pe8eoIzIcvGrFq-OzoycJ2TVCMb0Gr~9wr4nr8wDnwKzTdZn6rmRhrroGSdh6iICFlEtOnjtiEZ4q34urZfKhAwQ7ImPS0i509B9xpg0OHCoKM6bnICi3yR7PrY5Rk9WuR4lhbaQ8HUxEr~REL-zRcKw__"
          />
          <img
            alt="bg-image"
            style={{
              width: '254.07753385588347px',
              height: '345.5558221758777px',
              position: 'absolute', // Necessary for top and left to work
              top: '155.29px',
              left: '913.02px',
              transform: 'rotate(23.8deg)', // Angle converted to positive
            }}
            src="https://s3-alpha-sig.figma.com/img/d74e/851d/939651257570d5b8b596cf1d2fd89724?Expires=1745193600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=kZLEhYjbbJOf0BzmHvHUJTq6Bv1jyPqBLFfzaAXNc5FN7LQmTzpbLDz82MiM3WUlpmxZG2cbsyeGvpuaOclPA9LD4zr~FCwGOo5nNorlP7Y83LSFiariqGgGNnGjpXF4kgk68D8UFLRWilZe2ZPu4MZh~CtviRrpdZfXvlezHv5UMlirx5i~tEA5-da3PwuXn0c4tQm1SZU4H7wbxpCuDSeNfxdtTuFpRqQ0Ni6Lx-uhaCrshIeqpa9Pt7Iot63ppjUVQAgrf8nmJ3oKv0cQ8CuegqgD1CmVnKMgNO2DXvpPJMFRwt7N49pQ7TmipTpGSP6SAwKGOTvEKEemuUuvCg__"
          />
          <img
            alt="bg-image"
            style={{
              width: '422.3788828406821px',
              height: '315.0397999213511px',
              position: 'absolute', // Necessary for top and left to work
              top: '18.11px',
              left: '540.71px',
              transform: 'rotate(23.8deg)', // Angle converted to positive
            }}
            src="https://s3-alpha-sig.figma.com/img/b3d3/9c74/553d544a4a49eadc5ec808d6f393b084?Expires=1745193600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=mmiIIMTKBo6434VrSxiQGGUM76Irr1kYjUr17ZF~nY3bWU~~56GN17TUtGFKp19t8064jl~wOhZmSOkXyQN97pcotDUpcKQPmNSUvIojosa3VhxWkw9Q9PuoiiX5jX-Xfax6Q5z3q4QSYakCq6y6NbWdT-IiUcXnSb1v6Tr4ou7V8H-3BgCRLQ0t5IH1RkTGRXzp~26kR47BWCunyIlW3deTsxXOv4TFORbMvXDFouAFIC78aU-1dq3LHBZdEowO6I8scm0tojExIOxD01U0jFY2kstlLMnX0WoaB9Mu0bVEDeUPwW8r2dO-LWqL~3Z2tV34n4BwJhYcipv3cNu~Ug__"
          />
          <img
            alt="bg-image"
            style={{
              width: '210.8799626724781px',
              height: '300.0397999213511px',
              position: 'absolute', // Necessary for top and left to work
              top: '-85.59px',
              left: '350.42px',
              transform: 'rotate(23.8deg)', // Angle converted to positive
            }}
            src="https://s3-alpha-sig.figma.com/img/49c1/31dd/0b07013e9014f92cb90f5ceaaedc2187?Expires=1745193600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=MjMw0TKzzNDgC178kC2JIvQw~Uv9fdRUK4BKTKH07rxkvGsTNWbj3G7s3LlZ-3SyCTzFTA1lo6BIIkcC3lLX8C19SLQsSIF5mwDSVzM6IBbBdXCGBVrCzwwaubVWGSBkYk-Vs8dD~I5TucgX24U0Tqizweo4TumL7sunatmHfodg2EAkW0ETIBzrIe0KRC7XTarAOIFG9NZsBAFfRs8zI62MTpwKfHWDjcRTFvIfOiDlJf2rkFrVkpDMdOq-W~43d7mgmRvWDyB4T2dmDKPxnogMo98udpQU2A6HGGLn2qrHP7vzn8FQgDXOPwGYoNnMjzIgHQO7Zbkwxd2GglgL-A__"
          />
          <img
            alt="bg-image"
            style={{
              width: '208.38878227856404px',
              height: '329.9030818584828px',
              position: 'absolute', // Necessary for top and left to work
              top: '234.73px',
              left: '1122.62px',
              transform: 'rotate(23.8deg)', // Angle converted to positive
            }}
            src="https://s3-alpha-sig.figma.com/img/d208/e44e/67451c2069ed807d2ee28b19c97f3493?Expires=1745193600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=fJRP0mwqtPSoSYqW13gatMcE5NaG0vUIBkiAmfpCFDfyjqezDq2-aCCaHL8UXGHnm9TeS627nSAFkiID4de4o2T~UoA1KgoqG3K4jbLQh5~I8gd1zRuHMB1pxeZRl06dL3Usu0wsfdOmY~RZZvQi7j5lJSNg37PoSMbaNK-2y~Xqt0SWvaPNS4NEoqbfpbMErfcJivSOf8fO9f3Olb2g1Fdn9rUnoc9hmEOIiYmMRyR2xqmL1FTGcbivdcCJ5rcmg9d-XqUeONniU6HS3RVV1P7Gg6z9Mq7fCoe8h85gD0-IphIsFYwTGKpbInO250lyK3bYXLf-BJrz-~8wBgTyIQ__"
          />
          <img
            alt="bg-image"
            style={{
              width: '157.803652622438px',
              height: '237.03979900777912px',
              position: 'absolute', // Necessary for top and left to work
              top: '576.23px',
              left: '1509.32px',
              transform: 'rotate(23.8deg)', // Angle converted to positive
            }}
            src="https://s3-alpha-sig.figma.com/img/e9ab/a92c/49e0323b30f14ad832e9d171a992f24b?Expires=1745193600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=OE9Y3qz1~EUfuIcH7~oSw9RkvjKS-OC-WhRBcQPWUmAKgbyO~WNTTcfcYJITlBnUORi9xgxwre7vZi2WaFR9HbkPWHpWjLRVNqxOHp66tZ6E0ULLfmFBPC1oX-ppZQtIekZuhrjDIVzWLSbDmkCBjUKbPNG55T1aYt3O7wyNuwZuU--VFc5AAL2DypBBauaVwADXzpmc69LF~2AGVGrZe1a3ygqLatwVmXfj32qER0OxjLki3MAIqN6m~8FYNwTM9vLDSwctOcWx9Tj6GuJrt51j6M5QiZ1V8K6hlCgKyPG~Ah6gSEgf837K9lFFa4qT6-etYbNaadKLIXo3lCqXwg__"
          />
          <img
            alt="bg-image"
            style={{
              width: '157.803652622438px',
              height: '237.03979900777912px',
              position: 'absolute', // Necessary for top and left to work
              top: '576.23px',
              left: '1509.32px',
              transform: 'rotate(23.8deg)', // Angle converted to positive
            }}
            src="https://s3-alpha-sig.figma.com/img/3535/ef54/aa346c23b9548626f0fd394427b571df?Expires=1745193600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=O2e6WJ91BNLSec2ZTfm4UERbMtqjiEHgwAGpsSfSfxA-FLiIL~mwrUTpw4f9aJd~WJob7bjNHlHjs8fEAdun5PTzbYo0tI7uFhRrNrdFgNIPaEuyj~2UqXpNPOhD51KSWpEeL6n-q5GvowjtjbLgf1qIA8XTp7ohhH5HAf3-pi51pkHdpEoQK46hrtdDOkN164O76Kbft81fOrHwqXH9c7-5j2jH3dc1qpZys~wbJtXWhk5ldfdxwOPC89we0TORpB7464hnDNr5cqwTzRcQY2BBb7cBCG9BN6PO675TYz2C0YAOBauYg3t6RDiVNnTZII-lWy5sbzcBUAsuNOS7jA__"
          />
          <img
            alt="bg-image"
            style={{
              width: '457.803652622438px',
              height: '547.03979900777912px',
              position: 'absolute', // Necessary for top and left to work
              top: '-100px',
              left: '1520.13px',
              transform: 'rotate(23.8deg)', // Angle converted to positive
            }}
            src="https://s3-alpha-sig.figma.com/img/e9ab/a92c/49e0323b30f14ad832e9d171a992f24b?Expires=1745193600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=OE9Y3qz1~EUfuIcH7~oSw9RkvjKS-OC-WhRBcQPWUmAKgbyO~WNTTcfcYJITlBnUORi9xgxwre7vZi2WaFR9HbkPWHpWjLRVNqxOHp66tZ6E0ULLfmFBPC1oX-ppZQtIekZuhrjDIVzWLSbDmkCBjUKbPNG55T1aYt3O7wyNuwZuU--VFc5AAL2DypBBauaVwADXzpmc69LF~2AGVGrZe1a3ygqLatwVmXfj32qER0OxjLki3MAIqN6m~8FYNwTM9vLDSwctOcWx9Tj6GuJrt51j6M5QiZ1V8K6hlCgKyPG~Ah6gSEgf837K9lFFa4qT6-etYbNaadKLIXo3lCqXwg__"
          />
          <div data-testid="loginContainer" className="login-Container">
            <img
              alt="login website logo"
              src="https://res.cloudinary.com/diptulwgs/image/upload/v1744454422/first%20project/music_vpkci1.png"
            />
            <h1>Spotify Remix</h1>
            <form
              data-testid="formcontainer"
              onSubmit={this.onSubmission}
              className="form-container"
            >
              <label htmlFor="username">Username</label>
              <input
                value={userdetais}
                onChange={this.changingusername}
                id="username"
                type="text"
              />
              <label htmlFor="Password">Password</label>
              <input
                value={passworddetails}
                onChange={this.changingpassword}
                id="Password"
                type="password"
              />
              <button type="submit">Login</button>
              <p className="errorwala">{errormsg}</p>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default Login
