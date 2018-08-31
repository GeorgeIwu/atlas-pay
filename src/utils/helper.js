import iziToast from 'izitoast'
import '@/assets/assets/plugins/izitoast/izitoast.css'

export const toaster = (title, message = 'Processing', type = 'info', position = 'center', ...more) => {
    iziToast.destroy();
    iziToast[type]({ title, message, position, close: true, timeout: false, ...more });
}