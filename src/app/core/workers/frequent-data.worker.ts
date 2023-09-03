/// <reference lib="webworker" />

addEventListener('message', ({ data }: MessageEvent) => {
  const frequentData = data.frequentData.data;
  const options = data.options;
  const additionalIds = options.additionalId;
  const takeLast = (size: number) => frequentData.slice(-size);
  const lastNItems = takeLast(options.size);

  if (additionalIds) {
    const customData = frequentData.filter((e: any) =>
      additionalIds.includes(e?.id)
    );

    if (customData.length) {
      const deleteCount = customData.length;
      lastNItems.splice(0, deleteCount, ...customData);
    }
  }

  const result = {
    data: lastNItems,
    length: frequentData.length,
  };
  postMessage(result);
});
