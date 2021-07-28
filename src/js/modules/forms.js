import checkNumInputs from "./service/validation";

const getForms = (state) => {
    const forms = document.querySelectorAll('form');
    const inputs = document.querySelectorAll('input');

    checkNumInputs('input[name="user_phone"]');

    const msg = {
        success: 'Спасибо! Скоро мы свяжемся с вами.',
        loading: 'Загрузка...',
        failure: 'Что-то пошло не так...'
    };
    const postData = async (url, data) => {
        document.querySelector('.status').textContent = msg.loading;

        const result = await fetch(url, {
            method: 'POST',
            body: data
        });

        return await result.text();
    };

    const clearInputs = () => {
        inputs.forEach(item => {
            item.value = '';
        });
    };
    forms.forEach(item => {
        item.addEventListener('submit', (e) => {
            e.preventDefault();

            let statusMsg = document.createElement('div');
            statusMsg.classList.add('status');
            item.appendChild(statusMsg);

            const formData = new FormData(item);
            if (item.getAttribute('data-calc') === 'end') {
                for (let key in state) {
                    formData.append(key, state[key]);
                    state = {};
                }

            }
            postData('assets/server.php', formData)
                .then(res => {
                    console.log(res);
                    statusMsg.textContent = msg.success;
                })
                .catch(() => statusMsg.textContent = msg.failure)
                .finally(() => {
                    clearInputs();
                    setTimeout(() => {
                        statusMsg.remove();
                    }, 5000);
                });
        });
    });
};

export default getForms;
