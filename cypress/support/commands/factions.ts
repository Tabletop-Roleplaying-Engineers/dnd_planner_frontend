import { Faction } from '../../../src/types/faction'
import { FETCH_FACTIONS_QUERY } from '../../../src/api'
import { gqlRequest } from './gqlRequest'

export function getFactions() {
  return gqlRequest<Faction[]>({
    operationName: 'GetFactions',
    query: FETCH_FACTIONS_QUERY,
  }).its('factions')
}
