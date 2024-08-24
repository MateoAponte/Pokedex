import { Component } from 'vue';

export interface Stat {
  stat: string;
  name: string;
}

export interface IconStat {
  [key: string]: Component;
}
