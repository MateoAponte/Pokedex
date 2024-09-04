import { Component } from 'vue';

export interface Stat {
  base_stat: string;
  name: string;
}

export interface IconStat {
  [key: string]: Component;
}
