import router from '../router'
import iziToast from 'izitoast'
import '@/assets/assets/plugins/izitoast/izitoast.css'

export const onScreen = (object) => {
    if (object.error){
        let error = object.error
        let errorString = error.toString()
        let errorTypeOne = errorString.includes('500')
        let errorTypeTwo = errorString.includes('Network')
        let errorTitle
        let errorMessage
      
        if ( errorTypeOne ) {
            errorTitle = "Server Error"
            errorMessage = object.server || 'Please try again later'
        } else if ( errorTypeTwo ) {
            errorTitle ='Network Error'
            errorMessage = object.network || 'Please try again later'
        } else {
            errorTitle = 'Error'
            errorMessage = object.default || 'Please try again later'
    
        }
    
        iziToast.destroy();
        iziToast.error({
            title: errorTitle,
            message: errorMessage,
            position: 'center',
            close: true,
            timeout: false
        });
    }else {
        let iziToastSelector = {
            title: object.title,
            message: object.message,
            position: 'center',
            close: true,
            timeout: false
        }
        iziToast.destroy();
        if (object.type == 'success'){
            iziToast.success(iziToastSelector)
        } else if (object.type == 'info'){
            iziToast.info(iziToastSelector)
        } else {
            iziToast.warning(iziToastSelector)
        }
    }
}

function neverInvoke(){
    // Examples of how to call the different onScreen types
    // Just examples, do not call the  neverInvoke() function

    // error
    onScreen({
        error: error,
        default: 'Wrong email or password'
    })

    onScreen({
        error: error,
        server: 'Please try again later',
        network: 'Please try again later',
        default: 'Wrong email or password'
    })
    
    // success, info, warning
    onScreen({
        type: 'success',
        title: 'Sign Up Successful',
        message: 'Please check your mail',
    })

}
