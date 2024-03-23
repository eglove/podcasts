import { urlBuilder } from '@ethang/toolbelt/fetch/url-builder';
import { isNil } from '@ethang/toolbelt/is/nil';
import * as htmlparser2 from 'htmlparser2';
import { parse } from 'node-html-parser';

import type { YouTubeFeed } from '../types/youtube/youtube-feed';
import prisma from './prisma';

export async function getYouTubeChannelId(channelUrl: string) {
  const urlResult = urlBuilder(channelUrl);

  if (!urlResult.url.isSuccess) {
    return;
  }

  let youtubeChannelId: string | undefined;

  if (urlResult.url.data.hostname.includes('youtube.com')) {
    const response = await fetch(urlResult.url.data);
    const data = await response.text();
    const meta = parse(data).querySelector('meta[itemprop="identifier"]');
    youtubeChannelId = meta?.getAttribute('content') ?? undefined;
  }

  return youtubeChannelId;
}

export async function populateYouTubePodcast(
  channelId: string,
  podcastId: string,
  userId?: string,
) {
  const url = new URL(
    `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`,
  );
  const response = await fetch(url);
  const data = await response.text();
  const feed = htmlparser2.parseFeed(data) as YouTubeFeed | null;

  if (!isNil(feed)) {
    await prisma.podcastEpisode.createMany({
      data: feed.items.map(item => {
        return {
          podcastId,
          published: item.pubDate,
          title: item.title,
          url: item.link,
        };
      }),
      skipDuplicates: true,
    });

    if (!isNil(userId)) {
      const podcasts = await prisma.user.findUnique({
        select: { subscriptions: { select: { podcastEpisodes: true } } },
        where: { id: userId },
      });

      if (!isNil(podcasts)) {
        await prisma.userPodcastEpisode.createMany({
          data: podcasts.subscriptions.flatMap(subscripton => {
            return subscripton.podcastEpisodes.map(episode => {
              return { podcastEpisodeId: episode.id, userId };
            });
          }),
          skipDuplicates: true,
        });
      }
    }
  }
}
