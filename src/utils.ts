import { castDraft, Draft, produce } from 'immer';
import { always } from 'purify-ts';
import { Dispatch, SetStateAction } from 'react';
import { Updater } from "use-immer";

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

/**
 * Ensure a SetStateAction is in its functional form.
 */
function setStateThunk<S>(action: SetStateAction<S>): (old: S) => S {
    if (typeof action == "function") {
        return action as ((old: S) => S);
    }

    return always(action);
}

/**
 * Convert an Immer updater to a standard react useState setter.
 */
export function updaterToSetState<S>(updater: Updater<S>): Dispatch<SetStateAction<S>> {
    return (newValue: SetStateAction<S>) => {
        const thunk = setStateThunk(newValue);
        updater(draft => thunk(draft as S))
    }
}

function extractValue<V>(thunkOrValue: V | (() => V)): V {
    return typeof thunkOrValue == "function" ? (thunkOrValue as () => V)() : thunkOrValue;
}

/**
 * Create a substate (current value and immer updater) for a key in a map (already controlled by immer).
 * Will return undefined if the key isn't present, unless a fallback default is supplied.
 * Removing the value is not supported.
 */
export function mapStateLens<K, V>(map: Map<K, V>, updater: Updater<Map<K, V>>, key: K, defaultValue: () => V): [V, Updater<V>]
export function mapStateLens<K, V>(map: Map<K, V>, updater: Updater<Map<K, V>>, key: K, defaultValue: V): [V, Updater<V>]
export function mapStateLens<K, V>(map: Map<K, V>, updater: Updater<Map<K, V>>, key: K): [V, Updater<V>] | undefined
export function mapStateLens<K, V>(map: Map<K, V>, updater: Updater<Map<K, V>>, key: K, defaultValue?: (() => V) | V): [V, Updater<V>] | undefined {
    const currentValue = map.get(key) ?? (defaultValue ? extractValue(defaultValue) : undefined);

    if (currentValue === undefined) return undefined;

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