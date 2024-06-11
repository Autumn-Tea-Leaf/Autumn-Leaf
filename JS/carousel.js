// const container = document.querySelector('#carousel');

// const viewing = 0;

// const prev = document.querySelector('#prev');
// const next = document.querySelector('#next');

// next.on

let viewing = 0;

const container = $('#carousel');
const prev = $('#prev');
const next = $('#next');

update();

prev.on('click', () => {
    viewing--;

    if (viewing < 0) {
        viewing = 2;
    }

    update();
});

next.on('click', () => {
    viewing++;

    if (viewing > 2) {
        viewing = 0;
    }

    update();
});

function update() {
    const first = $(`.carousel-item-1`);
    const second = $(`.carousel-item-2`);
    const third = $(`.carousel-item-3`);

    first.css('transform', `translateX(-${100 * viewing}%)`);
    second.css('transform', `translateX(-${100 * viewing}%)`);
    third.css('transform', `translateX(-${100 * viewing}%)`);
}
