import scrapy


class userScrape(scrapy.Spider):
    name = 'uscraper'
    allowed_domains = ['twitter.com']

    def start_requests(self):
        url = 'https://www.twitter.com/'
        tag = getattr(self, 'POTUS', None)
        if tag is not None:
            url = url + tag
        yield scrapy.Request(url, self.parse)

    def parse(self, response):
        self.logger.debug('callback "parse": got response %r' % response)
        return self.parse_item(response)

    def parse_item(self, response):
        item = scrapy.Item()
        item['name'] = response.xpath('.//@data-name').extract()[0]
        item['tweet_count'] = response.css('.ProfileNav-value::text').extract()[0]
        return item
