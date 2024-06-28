import { createHtmlTagObject } from 'html-webpack-plugin'
import { experiments } from 'webpack'
import {startGame} from './index'

/**
 * @jest-environment jsdom
 */



test('Populate players gameBoard' , () => {
    expect(startGame()).toBe(true)
})