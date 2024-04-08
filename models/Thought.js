const { Schema, model } = require('mongoose');
const Reaction = require('./Reaction');

// Schema to create Post model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      minLength: 1,
      maxLength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    username: {
      type: String,
      required: true,
    },
    published: {
      type: Boolean,
      default: false,
    },
    buildSuccess: {
      type: Boolean,
      default: true,
    },
    reactions: [Reaction],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// Create a virtual property `getTags` that gets the amount of tags associated with an application
thoughtSchema
  .virtual('getResponses')
  // Getter
  .get(function () {
    return this.tags.length;
  });

// Initialize our Application model
const Thought = model('thought', thoughtSchema);

module.exports = Thought;
