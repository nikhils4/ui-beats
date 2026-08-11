"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const BlogPromotionalCard = () => {
  return (
    <Card className="my-10 w-full overflow-hidden bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
      <CardContent className="flex flex-col items-center justify-between p-8 md:flex-row">
        <div className="flex-1 space-y-6">
          <h3 className="text-4xl leading-tight font-extrabold text-gray-800 dark:text-gray-100">
            <span className="bg-gradient-to-r from-gray-600 to-gray-800 bg-clip-text text-transparent dark:from-gray-300 dark:to-gray-100">
              Level Up Your UI for FREE
            </span>
          </h3>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            An open-source collection of beautiful animated components
          </p>
          <Button
            className="hover:bg-opacity-90 rounded-md bg-gray-800 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:shadow-xl dark:bg-white dark:text-gray-800"
            asChild
          >
            <a href="https://uibeats.com">Explore Components</a>
          </Button>
        </div>
        <div className="mt-8 flex-1 md:mt-0 md:ml-8">
          <div className="relative overflow-hidden rounded-lg shadow-2xl">
            <video className="w-full" autoPlay muted loop playsInline>
              <source
                src="https://firebasestorage.googleapis.com/v0/b/projects-assets.appspot.com/o/uibeats-promotional-video.mp4?alt=media&token=972137f1-a282-461f-a09a-04c0d7e6590f"
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BlogPromotionalCard;
