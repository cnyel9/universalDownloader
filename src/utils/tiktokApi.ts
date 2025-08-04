import type { TikTokVideoResult, TikTokSlideResult } from '../types/api';

const TIKWM_HOST = 'https://www.tikwm.com/';

interface TikWMResponse {
  code: number;
  msg: string;
  data: {
    play?: string;
    music: string;
    author: {
      nickname: string;
    };
    title: string;
    images?: string[];
  };
}

const sendApiRequest = async (url: string): Promise<TikWMResponse['data']> => {
  try {
    const response = await fetch(`${TIKWM_HOST}api/`, {
      method: 'POST',
      headers: {
        'accept': 'application/json, text/javascript, */*; q=0.01',
        'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'sec-ch-ua': '"Chromium";v="104", " Not A;Brand";v="99", "Google Chrome";v="104"',
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36'
      },
      body: new URLSearchParams({
        url: url,
        count: '12',
        cursor: '0',
        web: '1',
        hd: '1'
      })
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data: TikWMResponse = await response.json();

    if (data.code !== 0) {
      throw new Error(`Failed to get data: ${data.msg}`);
    }

    return data.data;
  } catch (error) {
    throw new Error('Failed to process TikTok URL. Please check if the URL is valid.');
  }
};

export const downloadTikTok = async (url: string): Promise<TikTokVideoResult> => {
  const data = await sendApiRequest(url);

  if (data.play) {
    return {
      status: true,
      audio: `${TIKWM_HOST}${data.music}`,
      video: `${TIKWM_HOST}${data.play}`,
      author: data.author.nickname,
      desc: data.title
    };
  } else {
    throw new Error('The provided URL is not a regular video.');
  }
};

export const downloadTikTokSlide = async (url: string): Promise<TikTokSlideResult> => {
  const data = await sendApiRequest(url);

  if (data.images) {
    return {
      status: true,
      image: data.images,
      audio: `${TIKWM_HOST}${data.music}`,
      author: data.author.nickname,
      desc: data.title
    };
  } else {
    throw new Error('The provided URL is not a slide video.');
  }
};