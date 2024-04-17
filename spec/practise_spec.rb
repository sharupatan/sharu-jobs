class StringCalculator
    def self.add(input)
        if input.empty?
            0
        else
            numbers = input.split(',').map{ |num| num.to_i }
            numbers.inject(0) { |sum, number| sum + number }
        end
    end
end

describe StringCalculator do
    describe '.add' do
        context 'given an empty string' do
            it 'returns zero' do
                expect(StringCalculator.add('')).to eq(0)
            end
        end

        context 'given 4' do
            it 'returns 4' do
                expect(StringCalculator.add('4')).to eq(4)
            end
        end

        context 'given 10' do
            it 'returns 10' do
                expect(StringCalculator.add('10')).to eq(10)
            end
        end

        context 'given 2 numbers' do
            context 'given 2,4' do
                it 'returns 6' do
                    expect(StringCalculator.add('2,4')).to eql(6)
                end
            end

            context 'given 17,100' do
                it 'returns 117' do
                    expect(StringCalculator.add('17,100')).to eql(117)
                end
            end
        end
    end
end

class Run
    def initialize(duration, distance, timestamp)
        @duration = duration
        @distance = distance
        @timestamp = timestamp
    end

    def duration
        @duration
    end

    def distance
        @distance
    end

    def timestamp
        @timestamp
    end
end

describe Run do
    describe 'attributes' do
        subject do
            Run.new(32, 5.2,'2014-12-22 20:30')
        end

        it { is_expected.to respond_to(:duration)}
        it { is_expected.to respond_to(:distance)}
        it { is_expected.to respond_to(:timestamp)}
    end
end

describe 'Let Helper' do
    let(:py) do
        3.14
    end

    context 'given 3.14' do
        it 'returns 3.14' do
            expect(py).to eq(3.14)
        end
    end
end

class DivisionError < StandardError
end

describe 'Exceptions' do
    context 'made custom error' do
        it 'generate division error' do
            expect{raise DivisionError,'division error'}.to raise_error('division error')
        end
    end
end