import 'bootstrap/dist/css/bootstrap.min.css'

import '../css/main.css'

import { $, appendTo, createElement } from './dom-utils'

const customsData = {
  who: {
    virginie: {
      text: 'Virginie',
      effects: [
        {type: 'field', name: 'firstname', value: 'Virginie'},
        {type: 'field', name: 'lastname', value: 'Dargaud'},
        {type: 'field', name: 'birthday', value: '21/03/1959'},
        {type: 'field', name: 'placeofbirth', value: 'Neuilly-sur-Seine'},
      ]
    },
  },
  where: {
    avignon: {
      text: 'Avignon',
      effects: [
        {type: 'field', name: 'address', value: '327 chemin du moulin à huile'},
        {type: 'field', name: 'city', value: 'Saint Saturnin lès Apt'},
        {type: 'field', name: 'zipcode', value: '84490'},
      ]
    },
    grau: {
      text: 'Grau-du-Roi',
      effects: [
        {type: 'field', name: 'address', value: '4 Avenue de l\'Hermione'},
        {type: 'field', name: 'city', value: 'Le Grau-du-Roi'},
        {type: 'field', name: 'zipcode', value: '30240'},
      ]
    },
  },
  what: {
    walk: {
      text: 'balade',
      effects: [
        {type: 'checkbox', name: 'travail', value: false},
        {type: 'checkbox', name: 'achats', value: false},
        {type: 'checkbox', name: 'sante', value: false},
        {type: 'checkbox', name: 'famille', value: false},
        {type: 'checkbox', name: 'handicap', value: false},
        {type: 'checkbox', name: 'sport_animaux', value: true},
        {type: 'checkbox', name: 'convocation', value: false},
        {type: 'checkbox', name: 'missions', value: false},
        {type: 'checkbox', name: 'enfants', value: false},
      ]
    },
    shop: {
      text: 'courses',
      effects: [
        {type: 'checkbox', name: 'travail', value: false},
        {type: 'checkbox', name: 'achats', value: true},
        {type: 'checkbox', name: 'sante', value: false},
        {type: 'checkbox', name: 'famille', value: false},
        {type: 'checkbox', name: 'handicap', value: false},
        {type: 'checkbox', name: 'sport_animaux', value: false},
        {type: 'checkbox', name: 'convocation', value: false},
        {type: 'checkbox', name: 'missions', value: false},
        {type: 'checkbox', name: 'enfants', value: false},
      ]
    },
    pro: {
      text: 'travail',
      effects: [
        {type: 'checkbox', name: 'travail', value: true},
        {type: 'checkbox', name: 'achats', value: false},
        {type: 'checkbox', name: 'sante', value: false},
        {type: 'checkbox', name: 'famille', value: false},
        {type: 'checkbox', name: 'handicap', value: false},
        {type: 'checkbox', name: 'sport_animaux', value: false},
        {type: 'checkbox', name: 'convocation', value: false},
        {type: 'checkbox', name: 'missions', value: false},
        {type: 'checkbox', name: 'enfants', value: false},
      ]
    },
  },
  when: {
    now: {
      text: 'maintenant',
      effects: [
        {type: 'field', name: 'heuresortie', value: (() => {const date = new Date(); return date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })})()},
      ]
    },
    past: {
      text: '-10 minutes',
      effects: [
        {type: 'field', name: 'heuresortie', value: (() => {const date = new Date(); date.setMinutes(date.getMinutes() - 10); return date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })})()},
      ]
    },
  }
}

const changeMethodMappedByEffectType = {
  field: 'value',
  checkbox: 'checked'
}

const createSelectGroup = ({id, options}) => {
  const selectGroup = createElement('div', { className: 'form-group input-group align-items-center' })
  const select = createElement('select', { id: id, className: 'form-control custom-control' })
  selectGroup.append(select)

  for (const option in options) {
    const optionElement = createElement('option', { value: option })
    optionElement.innerText = options[option].text

    select.append(optionElement)
  }

  return selectGroup
}

export function createCustom () {
  const form = $('#form-custom')
  // Évite de recréer le formulaire s'il est déjà créé par react-snap (ou un autre outil de prerender)
  if (form.innerHTML !== '') {
    return
  }

  for (const customData in customsData) {
    form.append(createSelectGroup({id: customData, options: customsData[customData]}))
  }
}

const completeFormWithCustom = ({id, value}) => {
  const effects = customsData[id][value].effects

  effects.forEach((effect) => {
    const method = changeMethodMappedByEffectType[effect.type]
    $(`#${effect.type}-${effect.name}`)[method] = effect.value
  })
}

const completeFormWithChangedCustom = (changeEvent) => {
  completeFormWithCustom(changeEvent.target)
}

const registerOnChangeForCustoms = () => {
  $('#form-custom').addEventListener('change', completeFormWithChangedCustom)
}

const triggerAllCustomChanges = () => {
  Object.keys(customsData).forEach((id) => {
    const custom = $(`#${id}`)
    const changeEvent = new Event('change', { bubbles: true })
    custom.dispatchEvent(changeEvent)
  })
}

export function initCustom () {
  registerOnChangeForCustoms()

  triggerAllCustomChanges()
}
