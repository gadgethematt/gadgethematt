/**
 * Web Audio API synthesizer for acoustic demo and bass demonstration
 */

class AudioController {
  private ctx: AudioContext | null = null;
  private isPlayingBass: boolean = false;
  private activeOsc: OscillatorNode | null = null;

  private initCtx() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioContextClass();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  playBassSample(onEnd?: () => void) {
    const ctx = this.initCtx();
    if (!ctx) return;

    if (this.isPlayingBass && this.activeOsc) {
      try {
        this.activeOsc.stop();
      } catch {
        // ignore
      }
      this.isPlayingBass = false;
      if (onEnd) onEnd();
      return;
    }

    this.isPlayingBass = true;
    const now = ctx.currentTime;

    // Sub-bass sweep: 90Hz drops down to 38Hz with subtle punch
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const subOsc = ctx.createOscillator();
    const subGain = ctx.createGain();

    osc.type = 'sine';
    subOsc.type = 'triangle';

    // Frequency envelope
    osc.frequency.setValueAtTime(110, now);
    osc.frequency.exponentialRampToValueAtTime(42, now + 0.35);
    osc.frequency.setValueAtTime(40, now + 0.35);
    osc.frequency.exponentialRampToValueAtTime(36, now + 2.2);

    subOsc.frequency.setValueAtTime(80, now);
    subOsc.frequency.exponentialRampToValueAtTime(38, now + 0.4);

    // Gain envelope
    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.4, now + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.25, now + 1.8);
    gain.gain.linearRampToValueAtTime(0.0001, now + 2.4);

    subGain.gain.setValueAtTime(0.001, now);
    subGain.gain.linearRampToValueAtTime(0.15, now + 0.08);
    subGain.gain.exponentialRampToValueAtTime(0.0001, now + 2.0);

    osc.connect(gain);
    subOsc.connect(subGain);
    gain.connect(ctx.destination);
    subGain.connect(ctx.destination);

    this.activeOsc = osc;

    osc.start(now);
    subOsc.start(now);
    osc.stop(now + 2.45);
    subOsc.stop(now + 2.45);

    setTimeout(() => {
      this.isPlayingBass = false;
      this.activeOsc = null;
      if (onEnd) onEnd();
    }, 2500);
  }

  playAncTone(mode: 'anc' | 'transparency' | 'bass_boost') {
    const ctx = this.initCtx();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    if (mode === 'anc') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(520, now);
      osc.frequency.exponentialRampToValueAtTime(260, now + 0.18);
    } else if (mode === 'transparency') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(640, now + 0.18);
    } else {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(80, now);
      osc.frequency.exponentialRampToValueAtTime(50, now + 0.3);
    }

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.12, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.25);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.26);
  }
}

export const audioService = new AudioController();
