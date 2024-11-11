class PowerCheckout < Formula
    desc "Quickly switch to another branch"
    homepage "https://github.com/linqing24/power-checkout"
    url "https://github.com/linqing24/power-checkout/releases/download/v1.0.0/power-checkout.tar.gz"
    sha256 "61f48b6fbc05642991ec04da83f22c9328517295e5cfb5e707e8cdc0391a93ce"
    license "MIT"
    version "1.0.0"

    def install
        bin.install "pc"
    end
  end