const mongoose = require("mongoose");

const keywordSchema = new mongoose.Schema({
  stress: {
    type: Number,
    default: 0,
  },
  anxiety: {
    type: Number,
    default: 0,
  },
  depression: {
    type: Number,
    default: 0,
  },
  "anger management": {
    type: Number,
    default: 0,
  },
  irritability: {
    type: Number,
    default: 0,
  },
  phobia: {
    type: Number,
    default: 0,
  },
  insomania: {
    type: Number,
    default: 0,
  },
  exercise: {
    type: Number,
    default: 0,
  },
  fitness: {
    type: Number,
    default: 0,
  },
  "physical health": {
    type: Number,
    default: 0,
  },
  "healthy diet": {
    type: Number,
    default: 0,
  },
  nutrition: {
    type: Number,
    default: 0,
  },
  "de addiction": {
    type: Number,
    default: 0,
  },
  rehab: {
    type: Number,
    default: 0,
  },
  "self control": {
    type: Number,
    default: 0,
  },
  "self management": {
    type: Number,
    default: 0,
  },
  faith: {
    type: Number,
    default: 0,
  },
  coping: {
    type: Number,
    default: 0,
  },
  resilience: {
    type: Number,
    default: 0,
  },
  yoga: {
    type: Number,
    default: 0,
  },
  meditation: {
    type: Number,
    default: 0,
  },
  "decision making": {
    type: Number,
    default: 0,
  },
  leadership: {
    type: Number,
    default: 0,
  },
  peace: {
    type: Number,
    default: 0,
  },
  thankfulness: {
    type: Number,
    default: 0,
  },
  thanksgiving: {
    type: Number,
    default: 0,
  },
  kindness: {
    type: Number,
    default: 0,
  },
  overthinking: {
    type: Number,
    default: 0,
  },
  "social anxiety": {
    type: Number,
    default: 0,
  },
  friendliness: {
    type: Number,
    default: 0,
  },
  spirituality: {
    type: Number,
    default: 0,
  },
  prayer: {
    type: Number,
    default: 0,
  },
  satisfaction: {
    type: Number,
    default: 0,
  },
  therapy: {
    type: Number,
    default: 0,
  },
  parenting: {
    type: Number,
    default: 0,
  },
  "self-love": {
    type: Number,
    default: 0,
  },
  "menstrual-health": {
    type: Number,
    default: 0,
  },
  "menstrual-hygiene": {
    type: Number,
    default: 0,
  },
  "menstrual-problems": {
    type: Number,
    default: 0,
  },
  loyalty: {
    type: Number,
    default: 0,
  },
  confidence: {
    type: Number,
    default: 0,
  },
});

module.exports = keywordSchema;
