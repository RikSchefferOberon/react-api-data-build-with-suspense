import { Binding, EndpointParams, HookOptions } from './types';
declare type UseHook = <T, F = unknown>(endpointKey: string, params?: EndpointParams, options?: HookOptions) => Binding<T, F>;
declare const useApiData: UseHook;
export default useApiData;
