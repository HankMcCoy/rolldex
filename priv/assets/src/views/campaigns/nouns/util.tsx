
import { type NounType } from 'r/domains/nouns'

type NounTypePathToken = 'people' | 'factions' | 'places' | 'things'

export const getNounTypePathToken = (nounType: NounType): NounTypePathToken => {
	switch (nounType) {
		case 'PERSON':
			return 'people'
		case 'FACTION':
			return 'factions'
		case 'PLACE':
			return 'places'
		case 'THING':
			return 'things'
		default:
			throw new Error(`Unknown noun type: ${nounType}`)
	}
}

export const getNounTypeFromPathToken = (
	nounTypePathToken: NounTypePathToken
): NounType => {
	switch (nounTypePathToken) {
		case 'people':
			return 'PERSON'
		case 'factions':
			return 'FACTION'
		case 'places':
			return 'PLACE'
		case 'things':
			return 'THING'
		default:
			throw new Error(`Unknown noun type path token: ${nounTypePathToken}`)
	}
}

export const getNounTypeTitle = (nounType: NounType) => {
	switch (nounType) {
		case 'PERSON':
			return 'People'
		case 'FACTION':
			return 'Factions'
		case 'PLACE':
			return 'Places'
		case 'THING':
			return 'Things'
		default:
			throw new Error(`Unknown NounType: ${nounType}`)
	}
}
