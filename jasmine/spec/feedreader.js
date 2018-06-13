/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is a suite that contains a set of tests for testing the RSS
     * feeds.
     */
    describe('RSS Feeds', function() {
        
        /* It tests to make sure that the allFeeds variable has been 
         * defined and that it is not empty. 
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* 
         * It ensures allFeed variable has a URL defined for each feed
         * and that the URL is not empty.
         */
        it('URLs are defined and not empty', function () {
            // Loop over allFeeds object and check if url is defined and not empty
            for (let feed of allFeeds) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0)
            }
        });

        /* It ensures allFeed variable has a name defined for each feed
         * and that the name is not empty.
         */
        it('NAMEs are defined and not empty', function () {
            // Loop over allFeeds object and check if name is defined and not empty
            for (let feed of allFeeds) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0)
            }
        });
    });


    /* This is a suite that contains a set of tests for testing the menu
     * visibility.
     */
    describe('The menu', function () {
        
        // Variables initialization 
        var body,
            menuIcon;
        
        // Asynchronous request
        beforeEach(function () {
            body = $('body');
            menuIcon = $('.menu-icon-link')
        });

        /* It tests if the menu element is hidden by default.
         * hidden by default. 
         */
        it('is hidden by default', function () {
            expect(body.hasClass('menu-hidden')).toBe(true);
        });

        /* It tests if the menu element changes visibility state when  
         * menu icon is clicked (hidden or visible).
         */
        it('changes visibility', function () {
            menuIcon.trigger('click');
            expect(body.hasClass('menu-hidden')).toBe(false);
            menuIcon.trigger('click');
            expect(body.hasClass('menu-hidden')).toBe(true);
        })
    });

    /* This is a suite for testing the initial entries.
     */
    describe('Initial Entries', function () {

        // Variables initialization 
        var entry;
        
        // Asynchronous request
        beforeEach(function (done) {
            loadFeed(0, function() {
                entry = $('.feed .entry');
                done();
            })
        });

        /* It tests if the loadFeed function when called has at least  
         * one entry within the feed container.
         */
        it('are loaded', function (done) {
            expect(entry.length).toBeGreaterThan(0);
            done();
        })
    });

    /* This is a suite for testing the content changes in feed.
     */
    describe('New Feed Selection', function () {

        // Variables initialization 
        var oldFeed,
        newFeed;

        // Asynchronous request
        beforeEach(function (done) {
            // Loop over each initial entry and append to an array the innerText
            oldFeed = $('.entry').toArray().map(function(i){ return i.innerText });
            $('.feed').empty();
            
            loadFeed(1, function () {
                // Loop over each loaded entry and append to an array the innerText
                newFeed = $('.entry').toArray().map(function(i){ return i.innerText });
                done();
            });
        });

        /* It tests if the new selected feed is diferent from the previous.
         */
        it('is different from previous', function (done) {
            expect(oldFeed).not.toEqual(newFeed);
            done();
        })
    })
}());
