import { always } from 'purify-ts';
import { Dispatch, SetStateAction } from 'react';

/**
 * Either a record or a map.
 */
export type Mapping<K extends keyof any, V> = Record<K, V> | Map<K, V>;

/**
 * Get a list of entries from either a record or a map.
 */
export function entries<V>(mapOrRecord: Mapping<string, V>): [string, V][] {
    if (mapOrRecord instanceof Map) {
        return Array.from(mapOrRecord.entries())
    }
    return Object.entries(mapOrRecord as Record<string, V>)
}

export function composeSetState<S>(after: Dispatch<SetStateAction<S>>, before: (old: S) => S): Dispatch<SetStateAction<S>> {
    return (newValue: SetStateAction<S>) => {
        after((oldValue: S) => before(extractSetStateValue(oldValue, newValue)));
    }
}

function extractValue<V>(thunkOrValue: V | (() => V)): V {
    return typeof thunkOrValue == "function" ? (thunkOrValue as () => V)() : thunkOrValue;
}

function extractSetStateValue<S>(current: S, set: SetStateAction<S>): S {
    return (typeof set === "function") ? (set as (old: S) => S)(current) : set
}

/**
 * Create a substate (current value and updater) for a key in a map.
 * Will return undefined if the key isn't present, unless a fallback default is supplied.
 * Removing the value is not supported.
 */
export function mapStateLens<K, V>(map: Map<K, V>, updater: Dispatch<SetStateAction<Map<K, V>>>, key: K, defaultValue: () => V): [V, Dispatch<SetStateAction<V>>]
export function mapStateLens<K, V>(map: Map<K, V>, updater: Dispatch<SetStateAction<Map<K, V>>>, key: K, defaultValue: V): [V, Dispatch<SetStateAction<V>>]
export function mapStateLens<K, V>(map: Map<K, V>, updater: Dispatch<SetStateAction<Map<K, V>>>, key: K): [V, Dispatch<SetStateAction<V>>] | undefined
export function mapStateLens<K, V>(map: Map<K, V>, updater: Dispatch<SetStateAction<Map<K, V>>>, key: K, defaultValue?: (() => V) | V): [V, Dispatch<SetStateAction<V>>] | undefined {
    const currentValue = map.get(key) ?? (defaultValue ? extractValue(defaultValue) : undefined);

    if (currentValue === undefined) return undefined;

    return [currentValue,
        (newValue) => {
            const newMap = new Map(map);
            newMap.set(key, extractSetStateValue(currentValue, newValue));
            updater(newMap)
        }
    ]
}