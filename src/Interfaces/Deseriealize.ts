export interface Serializable<T>{
    deserialize(input: Object): Array<T>
}