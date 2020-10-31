import 'bootstrap/dist/css/bootstrap.min.css'

import '../css/main.css'

import './icons'
import './check-updates'
import { prepareForm } from './form-util'
import { warnFacebookBrowserUserIfNecessary } from './facebook-util'
import { addVersion } from './util'
import { createCustom, initCustom } from './custom'
import { createForm } from './form'

warnFacebookBrowserUserIfNecessary()
createCustom()
createForm()
prepareForm()
initCustom()
addVersion(process.env.VERSION)
