#pragma once
#include <vector>
#include <tuple>

#include "types.h"

using namespace std;

class ADSRModulator {
public:
  ADSRModulator(float xa, float ya, float xd, float ys, float xr);
  enum EnvelopeStage {
    ENVELOPE_STAGE_OFF = 0,
    ENVELOPE_STAGE_ATTACK,
    ENVELOPE_STAGE_DECAY,
    ENVELOPE_STAGE_SUSTAIN,
    ENVELOPE_STAGE_RELEASE
  };
  // NOTE: We want to implement a `modulatePitch` function here too, but to do
  // that we most likely need to manipulate the x value before calculating y...
  // So not sure if a chain like Oscillator <=> Modulator makes sense...
  void ModulateAmp(vector<Point> &buffer);
  void SetXA(float xa);
  void SetXD(float xd);
  void SetYS(float ys);
  void SetXR(float xr);
  void SetStage(EnvelopeStage stage);

private:
  EnvelopeStage stage;
  float xa, ya, xd, xs, ys, xr;
  float Modulate(float x, float prevX);
  static const float DECAY_UPPER_LIMIT, RELEASE_LOWER_LIMIT;

};
