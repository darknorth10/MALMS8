import { proxy } from 'valtio'


const states = proxy({
    showAlert : false,
})



export { states };