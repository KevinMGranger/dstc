import { Updater } from "use-immer";
import { castDraft, castImmutable, Draft, produce } from 'immer';
import {Dispatch, SetStateAction} from 'react';
import {always} from 'purify-ts';
import { pipe } from "remeda";

export type Mapping<K extends keyof any, V> = Record<K, V> | Map<K, V>;

// export function entries<K, V>(map: Map<K, V>): [K, V][]
// export function entries<K extends keyof any, V>(record: Record<K, V>): [K, V][]
export function entries<V>(mapOrRecord: Mapping<string, V>): [string, V][] {
    if (mapOrRecord instanceof Map) {
        return Array.from(mapOrRecord.entries())
    }
    return Object.entries(mapOrRecord as Record<string, V>)
}

function setStateThunk<S>(action: SetStateAction<S>): (old: S) => S {
    if (typeof action == "function") {
        return action as ((old: S) => S);
    }

    return always(action);
}

export function updaterToSetState<S>(updater: Updater<S>): Dispatch<SetStateAction<S>> {
    return (newValue: SetStateAction<S>) => {
        const thunk = setStateThunk(newValue);
        updater(draft => thunk(draft as S))
    }
}

export function mapStateLens<K, V>(map: Map<K, V>, updater: Updater<Map<K, V>>, key: K): [V, Updater<V>] {
    const currentValue = map.get(key) as V;
    return [currentValue,
        (newValue) => {
            updater(mapDraft => {
                mapDraft.set(
                    castDraft(key),
                    produce(currentValue, newValue) as Draft<V>
                )
            })
        }
    ]
}