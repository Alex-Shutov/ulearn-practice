import { expect } from 'chai';
import Song from './task';

describe('Song', () => {
    it('поля title, album и author заполняются правильно', () => {
        const someSong = new Song(
            'New Divide',
            'Linkin Park',
            'Transformers: Revenge of the Fallen – The Album'
        );
        expect(someSong.title).to.be.equal('New Divide');
        expect(someSong.author).to.be.equal('Linkin Park');
        expect(someSong.album).to.be.equal(
            'Transformers: Revenge of the Fallen – The Album'
        );
    });
    it('метод getFullName работает правильно', () => {
        const someSong = new Song('Kill the DJ', 'Green Day', '¡Uno!');
        expect(someSong.getFullName()).to.be.equal(
            'композиция «Kill the DJ», исполнитель Green Day, альбом «¡Uno!»'
        );
    });
    it('метод setYear работает правильно', () => {
        const someSong = new Song('Kill the DJ', 'Green Day', '¡Uno!');
        someSong.setYear(2012);
        expect(someSong.year).to.be.equal(2012);
    });
    it('метод setTitle работает правильно', () => {
        const someSong = new Song('Kill the DJ', 'Green Day', '¡Uno!');
        someSong.setTitle('Nuclear Family');
        expect(someSong.title).to.be.equal('Nuclear Family');
    });
    it('метод getFullName работает правильно после изменения названия', () => {
        const someSong = new Song('Kill the DJ', 'Green Day', '¡Uno!');
        someSong.setTitle('Nuclear Family');
        expect(someSong.getFullName()).to.be.equal(
            'композиция «Nuclear Family», исполнитель Green Day, альбом «¡Uno!»'
        );
    });
});
