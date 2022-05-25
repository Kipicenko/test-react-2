import {useDispatch, useSelector, TypedUseSelectorHook} from "react-redux"
import {AppDispatch, RootState} from "../redux/store";

export const useTypedDispatch = () => useDispatch<AppDispatch>()
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector